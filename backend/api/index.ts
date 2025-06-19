import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'ZiiOZ Backend is working!' });
});

app.listen(PORT, () => {
  console.log(`ZiiOZ backend running on port ${PORT}`);
});
