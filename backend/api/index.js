import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { createClient } from '@supabase/supabase-js';

import participant from '../routes/participants.js';
import organiser from '../routes/organisers.js';
import event from '../routes/event.js';
import login from '../routes/login.js';
import logout from '../routes/logout.js';
import refresh from '../routes/refresh.js'; 

export const supabase = createClient(process.env.SUPABASE_ENDPOINT, process.env.SUPABASE_ANON_API_KEY);

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: process.env.PRODUCTION ? 'https://eventloop-testbed.vercel.app' : 'http://localhost:3000',
  credentials: true,
}));

app.use('/health', async (req, res) => { return res.status(200).json({ message: 'server running.' }); });
app.use('/login', login);
app.use('/logout', logout);
app.use('/refresh', refresh);
app.use('/participants', participant)
app.use('/organisers', organiser);
app.use('/events', event);

export default app