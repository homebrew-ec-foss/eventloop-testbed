import express from 'express';
import validateUserDetails from '../middleware/validateUserDetails.js';
import { addOrganiser } from '../services/organiserService.js';

const router = express.Router();

router.post('/add', validateUserDetails, async (req, res) => {
  const { name, email } = req.validated;
  const role = 'organiser';

  try {
    const result = await addOrganiser(name, email, role);
    res.status(201).json(result);
  } catch (err) {
    if (err.code === 23505) {
      return res.status(409).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
})

export default router;
