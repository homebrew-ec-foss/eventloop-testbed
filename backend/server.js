import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import cookieParser from "cookie-parser";
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(process.env.SUPABASE_ENDPOINT, process.env.SUPABASE_ANON_API_KEY);

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());

const PORT = process.env.PORT;

app.use('', routes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});