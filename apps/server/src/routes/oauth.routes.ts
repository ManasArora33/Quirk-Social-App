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
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
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
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect('/api/v1/oauth/success');
  }
);

// Simple success page for backend-only testing
router.get('/success', (_req: Request, res: Response) => {
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
        (function() {
          try {
            if (window.opener && !window.opener.closed) {
              window.opener.postMessage({ type: 'OAUTH_SUCCESS' }, 'http://localhost:5173');
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
