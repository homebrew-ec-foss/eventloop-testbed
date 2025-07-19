import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/verifyJWT.js';
import { getAuthUser } from '../db/utils/getAuthUser.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.PRODUCTION === true,
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000,
};

router.post('', async (req, res) => {
    const credentials = req.body?.credentials;

    if (!credentials) return res.status(400).json({ error: 'missing credentials' });

    try {
        const user = await verifyToken(credentials); // verify jwt token

        const { email, name, sub } = user;
        let result = await getAuthUser(email, name); // gets matching record from db

        if(!result) return res.status(403).json({ error: '403 forbidden, records missing' });
        
        const userData = {
            name: name,
            email: email,
            role: result.role,
            sub: sub
        }

        const access_token = jwt.sign(
            userData,
            JWT_SECRET,
            { expiresIn: '24h' }
        )

        const refresh_token = jwt.sign(
            userData,
            REFRESH_JWT_SECRET,
            { expiresIn: '72h' }
        )

        res
            .cookie('access_token', access_token, COOKIE_OPTIONS)
            .cookie('refresh_token', refresh_token, { ...COOKIE_OPTIONS, maxAge: 72 * 60 * 60 * 1000, path: '/refresh'})
            .status(200)
            .json({
                user: {
                    name: result.name,
                    email: result.email,
                    role: result.role,
                    sub: sub,
                }
            });

        return res
    }

    catch(err) {
        console.error('login err: ', err);
        return res.status(401).json({ error: 'invalid token or server error' });
    }
})

export default router