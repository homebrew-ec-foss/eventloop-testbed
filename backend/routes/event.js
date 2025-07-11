import express from 'express';
import validateEvent from "../middleware/validateEvent.js";
import { addEvent, editEvent } from "../services/eventService.js";

const router = express.Router();

router.post('/create', validateEvent, async (req, res) => {
    const { name, date } = req.validated;

    try {
        const result = await addEvent(name, date);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.patch('/edit', validateEvent, async (req, res) => {
    const id = req.body?.id;
    const { name, date } = req.validated;

    try {
        const result = await editEvent(id, name, date);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Internal server error" })
    }
});

export default router;