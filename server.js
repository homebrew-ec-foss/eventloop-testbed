const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

PORT = process.env.PORT ? process.env.PORT : 8000;

app.use('/api/organiser', require('./routes/organiser'));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
