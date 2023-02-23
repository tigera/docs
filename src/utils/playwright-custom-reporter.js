/** @implements {import('@playwright/test/reporter').Reporter} */
class StdIoErrReporter {
  onBegin(config, suite) {
    console.log(`${'#'.repeat(80)}\n\nStarting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test) {
    console.log(`${'#'.repeat(40)}\n\nStarting test "${test.title}"`);
  }

  onTestEnd(test, result) {
    console.log(`\nFinished test "${test.title}": ${result.status}\n${'#'.repeat(40)}`);
  }

  onEnd(result) {
    console.log(`\n\nFinished the run: ${result.status}\n${'#'.repeat(80)}`);
  }

  onStdOut(chunk, test, result) {
    if (typeof chunk === 'string') {
      process.stdout.write(`${chunk}`);
    } else {
      process.stdout.write(`${chunk.toString()}`);
    }
  }
  onStdErr(chunk, test, result) {
    if (typeof chunk === 'string') {
      process.stderr.write(`${chunk}`);
    } else {
      process.stderr.write(`${chunk.toString()}`);
    }
  }

  onError(error) {
    if (!error) {
      console.error('[ERROR] An error has occurred, but no info is available!');
    } else {
      console.error(`[ERROR] An error has occurred: ${JSON.stringify(error)}`);
    }
  }

  printsToStdio() {
    return true;
  }
}

module.exports = StdIoErrReporter;