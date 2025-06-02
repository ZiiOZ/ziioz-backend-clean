"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_1 = __importDefault(require("openai"));
const router = express_1.default.Router();
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
router.post('/ai-post-enhance', async (req, res) => {
    const { content } = req.body;
    if (!content)
        return res.status(400).json({ error: 'No content provided' });
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                    role: 'user',
                    content: `
Generate a catchy 1-line hook for the following content. 
Then create 3-5 relevant hashtags without "#" prefix.
Respond in JSON format: { "hook": "...", "hashtags": ["...", "..."] }

Content:
${content}
        `
                }]
        });
        const json = response.choices?.[0]?.message?.content?.trim();
        const parsed = JSON.parse(json || '{}');
        res.json(parsed);
    }
    catch (err) {
        console.error('[AI Enhance Error]', err.message || err);
        res.status(500).json({ error: 'AI failed to enhance post' });
    }
});
exports.default = router;
