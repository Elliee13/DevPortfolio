const PORTFOLIO_CONTEXT = `You are a helpful assistant for a creative portfolio website. The portfolio owner is:
- A Full-Stack Web Developer specializing in React, Next.js, Node.js, and modern web technologies
- A UI/UX Designer with expertise in Figma, design systems, and user experience
- A Graphic Artist working with digital art, branding, and visual design

Skills include: Frontend (React, Next.js, TypeScript, Tailwind CSS, GSAP), Backend (Node.js, Express, PostgreSQL, MongoDB), Design (Figma, Adobe Creative Suite), and Creative Tools (Blender, Cinema 4D, Procreate).

Projects include web applications, UI/UX case studies, and graphic design work.

Keep responses concise, friendly, and professional. If asked about contact, mention they can use the contact form on the website.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = body.trim() ? JSON.parse(body) : {};
    }
    const message = body?.message?.trim();

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
    }

    const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    const modelPath = modelName.startsWith('models/')
      ? modelName
      : `models/${modelName}`;
    const prompt = `${PORTFOLIO_CONTEXT}\n\nUser: ${message}\n\nAssistant:`;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/${modelPath}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, I did not receive a response.';

    return res.status(200).json({ reply: text });
  } catch (error) {
    console.error('Gemini error:', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}
