import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? process.env.PORT : 8000;

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});