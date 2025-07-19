import express from 'express';
import organiser from './organisers.js';
import event from './event.js';
import login from './login.js';
import logout from './logout.js';
import refresh from './refresh.js';

const router = express.Router();

router.use('/login', login);
router.use('/logout', logout);
router.use('/refresh', refresh);
router.use('/organisers', organiser);
router.use('/events', event);
// router.use('/teams', require('./team'));
// router.use('/participants', require('./participant'));
// router.use('/logs', require('./participantLog'));

export default router;
