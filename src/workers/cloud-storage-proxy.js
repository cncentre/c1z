/**
 * cncentre (c1z.com) - Multi-Cloud Storage Edge Proxy
 * Description: A Cloudflare Worker to reverse-proxy and aggressively cache 
 * objects from Azure Blob Storage or AWS S3, eliminating cloud egress costs.
 * License: MIT
 */

const UPSTREAM_CLOUD_STORAGE = "https://cncentre-open-source.blob.core.windows.net";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = new URL(url.pathname, UPSTREAM_CLOUD_STORAGE);

    // 1. Only allow GET requests for safe file downloading
    if (request.method !== 'GET') {
      return new Response('Method Not Allowed. Only GET is supported by c1z.com CDN.', { status: 405 });
    }

    // 2. Check Cloudflare Cache first (Edge caching)
    const cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      // 3. Cache miss: Fetch from Azure/AWS Origin
      console.log(`[Cache Miss] Fetching from origin: ${targetUrl.toString()}`);
      response = await fetch(targetUrl, {
        headers: request.headers,
      });

      // 4. Modify headers to enforce long-term aggressive caching at the Edge (30 days)
      if (response.status === 200) {
        response = new Response(response.body, response);
        response.headers.set('Cache-Control', 'public, max-age=2592000, s-maxage=2592000');
        response.headers.set('X-Proxy-By', 'cncentre-cloudflare-edge');
        
        // Put the response into Cloudflare cache asynchronously
        ctx.waitUntil(cache.put(request, response.clone()));
      }
    } else {
      console.log(`[Cache Hit] Serving from Cloudflare Edge.`);
    }

    return response;
  }
};
