"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/api/ziibot-reply.ts
const express_1 = __importDefault(require("express"));
const openai_1 = __importDefault(require("openai"));
const supabaseServerClient_1 = require("../supabaseServerClient");
const router = express_1.default.Router();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
router.post('/ziibot-reply', async (req, res) => {
    const { comment, post_id } = req.body;
    if (!comment || !post_id) {
        return res.status(400).json({ error: 'Missing comment or post_id' });
    }
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: comment }],
        });
        const botReply = response.choices?.[0]?.message?.content;
        if (!botReply) {
            return res.status(500).json({ error: 'No reply generated' });
        }
        const { error } = await supabaseServerClient_1.supabase.from('comments').insert({
            post_id,
            username: 'ZiiBot 🤖',
            content: botReply,
        });
        if (error) {
            console.error('Supabase insert error:', error);
            return res.status(500).json({ error: 'Failed to insert comment' });
        }
        res.json({ reply: botReply });
    }
    catch (err) {
        console.error('[ZiiBot Error]', err);
        res.status(500).json({ error: 'AI Error' });
    }
});
exports.default = router;
