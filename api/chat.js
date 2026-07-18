// This runs on Vercel's server, NOT in the visitor's browser.
// It reads the secret Groq API key from an environment variable, so the key
// is never exposed to anyone visiting the website.
//
// Groq offers a genuinely free tier (no card required). This function calls
// Groq's OpenAI-compatible chat endpoint, then reshapes the response so it
// looks the same as what index.html already expects (data.content[0].text).

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        error: 'Server is missing GROQ_API_KEY. Add it in Vercel → Project Settings → Environment Variables.'
      });
      return;
    }

    const { system, messages, max_tokens, temperature } = req.body || {};

    if (!messages) {
      res.status(400).json({ error: 'Missing "messages" in request body' });
      return;
    }

    // Groq (like OpenAI) expects the system prompt as the first message,
    // not as a separate field like Anthropic does.
    const groqMessages = [];
    if (system) {
      groqMessages.push({ role: 'system', content: system });
    }
    messages.forEach(m => groqMessages.push({ role: m.role, content: m.content }));

    const groqBody = {
      model: 'llama-3.3-70b-versatile', // fast, capable, free-tier model on Groq
      messages: groqMessages,
      max_tokens: max_tokens || 500
    };
    if (typeof temperature === 'number') {
      groqBody.temperature = temperature;
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(groqBody)
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({
        error: (data.error && data.error.message) || 'Groq API error',
        raw: data
      });
      return;
    }

    const text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';

    // Reshape into the same format index.html already parses (Anthropic-style),
    // so the front-end code doesn't need any changes.
    res.status(200).json({ content: [{ type: 'text', text }] });
  } catch (err) {
    res.status(500).json({ error: 'Proxy request failed', details: String(err) });
  }
}
