/**
 * cncentre (c1z.com) - Cloudflare Turnstile API Validator
 * Description: Middleware script to validate Turnstile tokens before 
 * proxying requests to expensive enterprise cloud backends (e.g., SAP BTP, Aliyun).
 * License: MIT
 */

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY; // Stored securely in environment variables

export async function validateHumanTraffic(request) {
  // 1. Extract the token from the client request payload
  const requestBody = await request.clone().json();
  const token = requestBody.cf_turnstile_response;

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing Turnstile verification token. Bots not allowed." }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 2. Validate the token against Cloudflare's verification endpoint
  const formData = new FormData();
  formData.append('secret', TURNSTILE_SECRET_KEY);
  formData.append('response', token);
  formData.append('remoteip', request.headers.get('CF-Connecting-IP'));

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const result = await fetch(url, {
    body: formData,
    method: 'POST',
  });

  const outcome = await result.json();

  // 3. Forward to Enterprise Cloud Backend or Block
  if (outcome.success) {
    console.log(`[Turnstile] Human verified. Routing to primary cloud backend.`);
    // Proceed to handle the request (e.g., forwarding to SAP / AWS backend)
    return true; 
  } else {
    console.error(`[Turnstile] Bot detected! Reason: ${outcome['error-codes']}`);
    return false;
  }
}
