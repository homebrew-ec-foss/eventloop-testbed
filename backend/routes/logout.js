import express from 'express';
import cookieParser from 'cookie-parser';
const router = express.Router();

router.use(cookieParser());

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000,
};

router.post('', (req, res) => {
    res
        .clearCookie('access_token', COOKIE_OPTIONS)
        .clearCookie('refresh_token', { ...COOKIE_OPTIONS, maxAge: 72 * 60 * 60 * 1000, path: '/refresh'});
    return res.status(200).json({ message: 'Logged out successfully.' })
})

export default router;