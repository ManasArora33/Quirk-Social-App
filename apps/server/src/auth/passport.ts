import passport from 'passport';
import { googleStrategy } from './strategies/google.strategy';
import { githubStrategy } from './strategies/github.strategy';

// Register strategies (no sessions used)
passport.use(googleStrategy);
passport.use(githubStrategy);

export default passport;
