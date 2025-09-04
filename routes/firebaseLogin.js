const admin = require('firebase-admin');
const { serialize } = require("cookie");
const express = require("express")
const app = express();
const usedTokens = new Set();
const router = express.Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const serviceAccount = require('../config/jpsd-api-firebase-adminsdk-fbsvc-56c5c5b7f5.json');

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  
  
  router.post('/verify-token', async (req, res) => {
    const idToken = req.body.idToken; // Get ID token from the request
    const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 days in ms

    try {

      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

      const cookie = serialize("session", sessionCookie, {
        maxAge: expiresIn / 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
      });

      res.setHeader("Set-Cookie", cookie);
      res.json({ status: 0, message: 'Token is valid', data: decodedToken });

    } catch (error) {
      console.error('Error during token verification:', error);
      return res.status(401).json({ 
        status: 1, 
        message: error.message || 'An error occurred while verifying the token.' 
      });
    }
  });
  module.exports = router;