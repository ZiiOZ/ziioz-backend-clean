"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supabaseServerClient_1 = require("../supabaseServerClient");
const router = express_1.default.Router();
// GET comments for a post
router.get('/comments', async (req, res) => {
    const postId = req.query.postId;
    if (!postId) {
        return res.status(400).json({ error: 'Missing postId' });
    }
    const { data, error } = await supabaseServerClient_1.supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
    if (error) {
        console.error('Error fetching comments:', error.message);
        return res.status(500).json({ error: 'Failed to fetch comments' });
    }
    res.json(data);
});
exports.default = router;
