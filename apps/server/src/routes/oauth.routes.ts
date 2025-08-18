import express, { Request, Response } from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt';
import { IUser } from '../models/User.model';

const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response) => {
    const user = req.user as IUser;
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Redirect to backend-hosted success page so the popup remains on the backend origin
    // ensuring Set-Cookie is applied before posting a message to the opener
    res.redirect('/api/v1/oauth/success');
  }
);

// GitHub OAuth
router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  (req: Request, res: Response) => {
    const user = req.user as IUser;
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Keep popup on backend origin to avoid cross-site redirect before cookie commit
    res.redirect('/api/v1/oauth/success');
  }
);

// Simple success page for backend-only testing
router.get('/success', (_req: Request, res: Response) => {
  const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>OAuth Success</title>
    </head>
    <body style="font-family: system-ui, sans-serif; padding: 24px;">
      <h2>OAuth login successful</h2>
      <p>Auth cookie has been set.</p>
      <p>If this window doesn't close automatically, you can close it and return to the app.</p>
      <script>
        (async function() {
          try {
            // Give the browser a tick to persist Set-Cookie, then verify via /auth/me
            await new Promise(r => setTimeout(r, 50));
            try {
              await fetch('/api/v1/auth/me', { method: 'GET', credentials: 'include' });
            } catch (e) {
              // ignore network/CORS; we still notify the opener
            }
            if (window.opener && !window.opener.closed) {
              window.opener.postMessage({ type: 'OAUTH_SUCCESS' }, '${clientOrigin}');
              window.close();
            }
          } catch (e) {
            // ignore
          }
        })();
      </script>
    </body>
  </html>`);
});

export default router;
