import 'dotenv/config';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../../models/User.model';
import { generateUniqueUsername } from '../../utils/username';

export const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/api/v1/oauth/google/callback'
}, async (accessToken: string, _: string, profile: any, done: (err?: Error | null, user?: any) => void) => {
    try {
        const email = profile.emails?.[0].value;
        let user = await User.findOne({
            $or: [{ googleId: profile.id }, { email }]
        });

        if (!user) {
            const seed = profile.username || profile.displayName || (email ? email.split('@')[0] : 'user');
            const username = await generateUniqueUsername(seed);
            user = await User.create({
                googleId: profile.id,
                username,
                email,
                displayName: profile.displayName,
                avatar: profile.photos?.[0].value,
                isVerified: true
            });
        }

        // Return only the user; token will be generated in the route
        done(null, user);
    } catch (err) {
        done(err instanceof Error ? err : new Error('An unknown error occurred'));
    }
});