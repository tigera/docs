const nodeUrl = require('node:url');
const needle = require('needle');
const { RateLimiter } = require('limiter');
const defDelay = 1000;    // ms
const defMaxRetry = 10;
const needleOpts = {
  compressed          : false,  // sets 'Accept-Encoding' to 'gzip, deflate, br'
  follow_max          : 7,      // follow redirects
  follow_keep_method  : true,   // on redirect, use original verb
  parse_response      : false,  // don't parse the response
  rejectUnauthorized  : true,   // verify SSL certificate
  user_agent          : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
};
const URL_CHECK_DEBUG = process.env.URL_CHECK_DEBUG
  ? process.env.URL_CHECK_DEBUG.trim() : undefined;
const defRateLimit = '10/second';
const rateLimit = process.env.RATE_LIMIT
  ? process.env.RATE_LIMIT.split('/') : defRateLimit.split('/');
const limiter = new RateLimiter({
  tokensPerInterval: Number(rateLimit[0]),
  interval: rateLimit[1],
});
console.log(`Rate limiting: ${rateLimit[0]}/${rateLimit[1]} (default ${defRateLimit})`);
console.log('Use env var RATE_LIMIT=N/sec to customize');

function parseRetryAfter(headers, defValue) {
  let hdrVal = '';
  try {
    if (!headers) return defValue;
    hdrVal = headers.hasOwnProperty('retry-after')
      ? headers['retry-after'].trim() : '';
    if (hdrVal === '') return defValue;
    debugLog('/', `Header 'retry-after' has value: ${hdrVal}`);
    return parseFloat(hdrVal) * 1000;
  } catch (err) {
    console.error(`Error parsing 'retry-after' header '${hdrVal}': ${err}`)
    return defValue;
  }
}

function debugLog(url, msg) {
  if (!URL_CHECK_DEBUG || URL_CHECK_DEBUG === '') return;
  if (url.includes(URL_CHECK_DEBUG)) console.log(msg);
}

function doGet(normUrl, callback, calls, delay, ctx) {
  let endDone = false;
  const get = needle.request('get', normUrl, null, needleOpts);

  get.on('header', (code, headers) => {
    debugLog(normUrl, `IN get header EVENT: ${normUrl}`);
    ctx.statusCode = code;
    ctx.status = code === 200 ? 'alive' : 'dead';
    delay = parseRetryAfter(headers, delay);
  });
  get.on('data', chunk => {
    debugLog(normUrl, `IN get data EVENT: ${normUrl}`);
    get.request.abort();
    get.request.destroy();
  });
  get.on('done', err => {
    debugLog(normUrl, `IN get done EVENT: ${normUrl}`);
    ctx.err = err;
    ctx.status = (err) ? 'error' : ctx.status;
    end();
  });
  get.on('close', () => {
    debugLog(normUrl, `IN get close EVENT: ${normUrl}`);
    end();
  });

  const end = () => {
    if (endDone) return;
    endDone = true;
    if (!ctx.err && ctx.statusCode === 429 && calls < defMaxRetry) {
      debugLog(normUrl, `IN get retry-after (${delay/1000} seconds): ${normUrl}`);
      setTimeout(doGet, delay, normUrl, callback, 1+calls, delay, ctx);
      return;
    }
    callback(null, ctx);
  }
}

async function urlCheck(url, callback, calls = undefined) {
  try {
    await limiter.removeTokens(1);
    calls = calls ? calls : 1;
    let delay = defDelay * calls;
    const normUrl = encodeURI(decodeURIComponent(new URL(url).toString()));
    const ctx = { link: url, statusCode: 0, status: '', err: null };
    needle.request('head', normUrl, null, needleOpts, (err, resp) => {
      debugLog(normUrl, `IN head callback: ${normUrl}`);
      ctx.err = err;
      if (resp) ctx.statusCode = resp.statusCode;
      ctx.status = ctx.statusCode === 200 ? 'alive' : 'dead';
      if (!err && resp && resp.statusCode === 429 && calls < defMaxRetry) {
        delay = parseRetryAfter(resp.headers, delay);
        debugLog(normUrl, `IN head retry-after (${delay/1000} seconds): ${normUrl}`);
        setTimeout(urlCheck, delay, url, callback, 1+calls);
      } else if (!err && (ctx.statusCode === 200 || ctx.statusCode === 404)) {
        debugLog(normUrl, `IN head 200/404: ${normUrl}`);
        callback(err, ctx);
      } else {
        debugLog(normUrl, `IN head failed - trying GET: ${normUrl}, err: ${err}, code: ${resp?.statusCode}`);
        doGet(normUrl, callback, calls, delay, ctx);
      }
    });
  } catch (err) {
    console.error(`ERROR: caught error: urlCheck: ${url}, err: ${JSON.stringify(err)}`);
    callback(err, { status: 'error', link: url, err: null });
  }
}

module.exports = urlCheck;
