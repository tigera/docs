const PASSWORD = Netlify.env.get('TAG_PASSWORD');

export default async (request, context) => {
  if (!PASSWORD) {
    return new Response('Server configuration error: TAG_PASSWORD is not set.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const cookie = request.headers.get('cookie') || '';

  // Already authenticated — proxy to the private site
  if (cookie.includes('tag_auth=authorized')) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/tag/, '') || '/';
    const target = `https://tag-docs-tigera.netlify.app/tag${path}${url.search}`;
    return fetch(target, {
      headers: request.headers,
    });
  }

  // Handle form submission
  if (request.method === 'POST') {
    const body = await request.formData();
    if (body.get('password') === PASSWORD) {
      const url = new URL(request.url);
      return new Response(null, {
        status: 302,
        headers: {
          'Location': url.pathname + url.search,
          'Set-Cookie': 'tag_auth=authorized; Path=/tag; HttpOnly; Secure; SameSite=Lax; Max-Age=86400',
        },
      });
    }
  }

  // Show login page
  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authentication Required</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: 'DM Sans', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(160deg, #273981 0%, #141414 50%, #0a0a0a 100%);
    }
    .auth-card {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      padding: 45px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    .auth-logo {
      display: block;
      margin: 0 auto 32px;
      height: 36px;
    }
    h2 {
      color: #fff;
      font-weight: 500;
      font-size: 1.25rem;
      text-align: center;
      margin: 0 0 28px;
    }
    label {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.875rem;
      font-weight: 500;
      display: block;
      margin-bottom: 6px;
    }
    input {
      display: block;
      width: 100%;
      padding: 12px 14px;
      font-size: 1rem;
      font-family: 'DM Sans', sans-serif;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 5px;
      color: #fff;
      outline: none;
      transition: border-color 0.2s;
    }
    input:focus { border-color: #1084BD; }
    input::placeholder { color: rgba(255, 255, 255, 0.35); }
    button {
      display: block;
      width: 100%;
      margin-top: 20px;
      padding: 12px;
      font-size: 1rem;
      font-weight: 700;
      font-family: 'DM Sans', sans-serif;
      background: #F69320;
      color: #141414;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    button:hover { background: #e07d0a; }
  </style>
</head>
<body>
  <div class="auth-card">
    <img src="/img/Tigera-logo-2026-white-text.svg" alt="Tigera" class="auth-logo">
    <h2>Enter password to continue</h2>
    <form method="POST">
      <label for="password">Password</label>
      <input id="password" type="password" name="password" placeholder="Password" autofocus>
      <button type="submit">Submit</button>
    </form>
  </div>
</body>
</html>`, {
    status: 401,
    headers: { 'Content-Type': 'text/html' },
  });
};

export const config = { path: '/tag/*' };
