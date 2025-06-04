import express from 'express';
import OpenAI from 'openai';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

router.post('/api/spin-post', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'No content provided' });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: `
Create 3 alternate versions of the following post, keeping the meaning but using different tones/styles. Respond as a JSON array:
[
  "First version",
  "Second version",
  "Third version"
]

Post:
${content}
        `
      }],
    });

    const text = response.choices?.[0]?.message?.content?.trim();
    const spins = JSON.parse(text || '[]');
    res.json({ spins });
  } catch (err) {
    console.error('SpinPost API error:', err);
    res.status(500).json({ error: 'Spin failed' });
  }
});

export default router;
