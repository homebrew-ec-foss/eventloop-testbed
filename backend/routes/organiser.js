import express from 'express';
import db from '../db/init_db.js';
import validateOrganiser from '../middleware/validateOrganiser.js';
import { addOrganiser } from '../services/organiserService.js';

const router = express.Router();

router.post('/add', validateOrganiser, async (req, res) => {
  const { name, email } = req.validated;

  try {
    const result = await addOrganiser(db, name, email);
    res.status(201).json(result);
  } catch (err) {
    if (err.message === 'Email already in use') {
      return res.status(409).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

export default router;
