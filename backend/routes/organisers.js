import express from 'express';
import validateUserDetails from '../middleware/validateUserDetails.js';
import { getOrganisers, addOrganiser, editOrganiser } from '../services/organiserService.js';

const router = express.Router();

router.get('', async(req, res) => {
  try {
    const organisers = await getOrganisers({ role: 'organiser' });
    return res.status(200).json({ data: organisers });
  }
  catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.post('/add', validateUserDetails, async (req, res) => {
  const { name, email } = req.validated;
  const role = 'organiser';

  try {
    const result = await addOrganiser(name, email, role);
    res.status(201).json(result);
  } catch (err) {
    if (err.code === 23505) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
})

router.patch('/edit', validateUserDetails, async (req, res) => {
  const { name, email } = req.validated;
  const role = 'organiser';

  try {
    const result = await editOrganiser(name, email, role);
    res.status(201).json(result);
  } catch (err) {
    if (err.code === 23505) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
})

export default router;
