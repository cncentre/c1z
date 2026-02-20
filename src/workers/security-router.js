export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('User-Agent') || '';
    const blockedUserAgents = ['curl', 'wget', 'python-requests', 'scrapy'];
    if (blockedUserAgents.some(bot => userAgent.toLowerCase().includes(bot))) {
      return new Response('Access Denied by cncentre Edge Security.', { status: 403 });
    }
    let response = await fetch(new Request(url, request));
    let newHeaders = new Headers(response.headers);
    newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    newHeaders.set('X-Frame-Options', 'DENY');
    newHeaders.set('Server', 'cncentre-edge-node');
    return new Response(response.body, { status: response.status, headers: newHeaders });
  }
};
