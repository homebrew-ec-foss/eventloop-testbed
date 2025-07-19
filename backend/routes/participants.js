import express from 'express';
import validateUserDetails from '../middleware/validateUserDetails.js';
import { getParticipants, addParticipant } from '../services/participantService.js';

const router = express.Router();

router.get('', async(req, res) => {
  const email = req.email;
  let participants;
  try {
    if (email) {
      participants = await getParticipants({ email });
    }
    else {
      participants = await getParticipants();
    }
    return res.status(200).json({ data: participants });
  }
  catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.post('/add', validateUserDetails, async (req, res) => {
  const { name, email } = req.validated;

  try {
    const result = await addParticipant(name, email);
    res.status(201).json(result);
  } catch (err) {
    if (err.code === 23505) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
})

export default router;
