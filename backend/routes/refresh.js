import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000,
};

router.get('', async (req, res) => {
    const access_token = req?.cookies?.access_token;
    const refresh_token = req?.cookies?.refresh_token;

    try {
        const user = jwt.verify(access_token, JWT_SECRET);
        return res.json({ loggedIn: true, user });
    }
    catch (err) {
        if (!refresh_token) return res.status(401).json({ error: 'unauthenticated' });

        try {
            const payload = jwt.verify(refresh_token, REFRESH_JWT_SECRET);
            const { exp, ...payloadWithoutExp } = payload;

            const new_access_token = jwt.sign({ ...payloadWithoutExp }, JWT_SECRET, { expiresIn: '24h' });
            return res.cookie('access_token', new_access_token, COOKIE_OPTIONS)
            .status(200)
            .json({ loggedIn: true, user: payload });
        } catch (err) {
            console.log(err);
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            return res.status(401).json({ error: 'Refresh token expired' });
        }
    }
});

export default router