import express from 'express';
import cors from 'cors';

import commentsApi from './comments.api';
import aiPostEnhance from './ai-post-enhance';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', commentsApi);
app.use('/api', aiPostEnhance);

app.get('/', (_, res) => res.send('ZiiOZ Backend Live'));

export default app;
