import express from 'express';
import organiser from './organiser.js';
import event from './event.js';

const router = express.Router();

router.use('/organisers', organiser);
router.use('/events', event);
// router.use('/teams', require('./team'));
// router.use('/participants', require('./participant'));
// router.use('/logs', require('./participantLog'));

export default router;
