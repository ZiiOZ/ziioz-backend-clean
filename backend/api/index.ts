import express from 'express';
import cors from 'cors';
import commentsApi from './comments.api';
import spinPost from './spin-post';
import aiPostEnhance from './ai-post-enhance';
import ziiBotReply from './ziibot-reply';

const app = express();
app.use(cors());
app.use(express.json());

// Correct: use as router modules
app.use('/api/comments', commentsApi);
app.use('/api/spin-post', spinPost);
app.use('/api/ai-post-enhance', aiPostEnhance);
app.use('/api/ziibot-reply', ziiBotReply);

app.get('/', (_, res) => res.send('ZiiOZ Backend API Live!'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
