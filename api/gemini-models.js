const listModels = async (apiKey, apiVersion) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/${apiVersion}/models?key=${apiKey}`
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${apiVersion} error: ${response.status} ${errorText}`);
  }

  return response.json();
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
  }

  try {
    let data;
    try {
      data = await listModels(apiKey, 'v1');
    } catch (error) {
      data = await listModels(apiKey, 'v1beta');
    }

    const models = (data.models || []).map((model) => ({
      name: model.name,
      displayName: model.displayName,
      supportedMethods: model.supportedGenerationMethods || [],
    }));

    return res.status(200).json({ models });
  } catch (error) {
    console.error('List models error:', error);
    return res.status(500).json({ error: 'Failed to list models' });
  }
}
