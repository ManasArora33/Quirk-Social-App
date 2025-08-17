import 'dotenv/config';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../../models/User.model';
import { generateUniqueUsername } from '../../utils/username';

export const githubStrategy = new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: '/api/v1/oauth/github/callback',
  userAgent: 'QuirkApp',
  customHeaders: { 'User-Agent': 'QuirkApp', 'Accept': 'application/vnd.github+json' }
}, async (accessToken: string, _: string, profile: any, done: (err?: Error | null, user?: any) => void) => {
  try {
    const providedEmail: string | undefined = profile.emails?.[0]?.value;
    const email = providedEmail ?? `github_${profile.id}@users.quirk.local`;
    const query: any = { $or: [{ githubId: profile.id }] };
    if (providedEmail) query.$or.push({ email: providedEmail });
    let user = await User.findOne(query);
    
    if (!user) {
      const seed = profile.username || profile.displayName || (providedEmail ? providedEmail.split('@')[0] : 'user');
      const username = await generateUniqueUsername(seed);
      const newUser: any = {
        githubId: profile.id,
        username,
        displayName: profile.displayName || profile.username,
        avatar: profile.photos?.[0].value,
        isVerified: true
      };
      newUser.email = email;
      user = await User.create(newUser);
    }
    
    // Return only the user; token will be generated in the route
    done(null, user);
  } catch (err) {
    done(err instanceof Error ? err : new Error(String(err)));
  }
});