/**
 * cncentre (c1z.com) - Edge AI DevOps Assistant
 * Description: A Cloudflare Workers AI script that analyzes server error logs 
 * (e.g., from Nginx, Docker, or Cloud-init) and provides actionable troubleshooting steps.
 * Powered by Cloudflare Workers AI (Llama 3).
 * License: MIT
 */

export default {
  async fetch(request, env) {
    // Only accept POST requests containing log data
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed. Send a POST request with log data.', { status: 405 });
    }

    try {
      const payload = await request.json();
      const serverLog = payload.log_snippet || payload.error_message;

      if (!serverLog) {
        return new Response('Missing log data in request body.', { status: 400 });
      }

      // Call Cloudflare Workers AI to analyze the DevOps issue
      // Using a fast, open-source instruction model available on Cloudflare Edge
      const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { 
            role: "system", 
            content: "You are a Senior Cloud Infrastructure Architect. Analyze the provided server log, identify the root cause of the error, and provide a concise, step-by-step solution to fix it (focusing on Linux, Docker, and major cloud providers)." 
          },
          { 
            role: "user", 
            content: `Analyze this server log and tell me how to fix it:\n\n${serverLog}` 
          }
        ]
      });

      // Return the AI-generated troubleshooting steps as JSON
      return new Response(JSON.stringify({
        status: "success",
        analysis: aiResponse.response,
        provider: "Cloudflare Workers AI"
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: "Edge AI analysis failed." }), { status: 500 });
    }
  }
};
