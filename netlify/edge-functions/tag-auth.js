const PASSWORD = Netlify.env.get('TAG_PASSWORD');

export default async (request, context) => {
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
          'Location': url.pathname,
          'Set-Cookie': 'tag_auth=authorized; Path=/tag; HttpOnly; Secure; SameSite=Lax; Max-Age=86400',
        },
      });
    }
  }

  // Show login page
  return new Response(`
    <!DOCTYPE html>
    <html>
    <head><title>Authentication Required</title>
    <style>
      body { font-family: system-ui; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
      form { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      input { display: block; width: 100%; padding: 0.5rem; margin: 0.5rem 0 1rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
      button { background: #2563eb; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 4px; cursor: pointer; }
    </style>
    </head>
    <body>
      <form method="POST">
        <h3>Enter password to continue</h3>
        <input type="password" name="password" placeholder="Password" autofocus />
        <button type="submit">Submit</button>
      </form>
    </body>
    </html>
  `, {
    status: 401,
    headers: { 'Content-Type': 'text/html' },
  });
};

export const config = { path: '/tag/*' };
