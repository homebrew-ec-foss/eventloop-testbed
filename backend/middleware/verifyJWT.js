import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import cookieParser from 'cookie-parser';

const router = express.Router();

router.use(cookieParser());

const OAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyToken(token) {
  const ticket = await OAuthClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return {
    name: payload.name,
    email: payload.email,
    sub: payload.sub
  };
}

export default verifyToken