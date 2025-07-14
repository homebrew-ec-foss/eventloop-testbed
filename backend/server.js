import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import checkAdminRecords from './db/utils/checkAdminRecords.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());

checkAdminRecords();

const PORT = process.env.PORT;

app.use('', routes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});