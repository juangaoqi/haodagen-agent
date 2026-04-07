export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { messages, system } = req.body;

    // Convert messages to Gemini format
    const contents = messages.map(m => {
      const parts = [];
      if (Array.isArray(m.content)) {
        m.content.forEach(c => {
          if (c.type === 'text') {
            parts.push({ text: c.text });
          } else if (c.type === 'image') {
            parts.push({ inlineData: { mimeType: c.source.media_type, data: c.source.data } });
          }
        });
      } else {
        parts.push({ text: m.content });
      }
      return { role: m.role === 'assistant' ? 'model' : 'user', parts };
    });

    const body = {
      systemInstruction: { parts: [{ text: system || '' }] },
      contents,
      generationConfig: { maxOutputTokens: 1200, temperature: 0.9 }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || '请求失败' });
    }

    // Convert to Anthropic-compatible format so frontend works without changes
    const text = data.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
    return res.status(200).json({ content: [{ type: 'text', text }] });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
