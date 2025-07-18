import express from 'express';
import validateEvent from '../middleware/validateEvent.js';
import { getEvents, addEvent, editEvent, deleteEvent } from '../services/eventService.js';

const router = express.Router();

router.get('', async(req, res) => {
  try {
    const events = await getEvents();
    return res.status(200).json({ data: events });
  }
  catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

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
        res.status(500).json({ error: "Internal server error" })
    }
});

router.delete('/delete', async (req, res) => {
    const eventID = req.body?.id;
    const event = await deleteEvent(eventID);

    console.log(event);   
    // console.log(event.success);

    if (event) {
        try {
            const removedEvent = await deleteEvent(eventID);
            console.log(removedEvent);
            return res.status(200).json({ message: `Event '${event['events'][0].name}' deleted.` });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    else return res.status(400).json({ event });
})

export default router;