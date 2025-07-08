const express = require('express');
const db = require('../db/db.js')

const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) return res.status(400).json({ error: 'Missing fields' });

  if (name.length > 128) return res.status(400).json({ error: 'Name cannot be more than 128 characters.' })
  if (email.length > 256) return res.status(400).json({ error: 'Email cannot be more than 256 characters.' })

  const nameRegex = /^[a-zA-Z0-9 .,_-]{1,128}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!nameRegex.test(name)) return res.status(400).json({ error: 'illegal characters in name. please remove them.' })
  if(!emailRegex.test(email)) return res.status(400).json({ error: 'illegal characters in email. please remove them.' })

  const insertRecord = db.prepare('INSERT INTO organisers (name, email) VALUES (?, ?)');

  try {
    insertRecord.run(name, email);
    res.status(201).json({ success: true, name: name, email: email });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      return res.status(409).json({ error: 'Email already in use.' })
    }
    res.status(500).json({ error: 'Email must be unique or other DB error' });
  }
});

module.exports = router;
