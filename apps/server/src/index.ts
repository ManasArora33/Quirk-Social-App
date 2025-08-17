import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import tweetRoutes from './routes/tweet.routes';
import userRoutes from './routes/user.routes';
import oauthRoutes from './routes/oauth.routes';
import passport from './auth/passport';
import cookieParser from 'cookie-parser';
// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.set('trust proxy', 1);  // Essential for Render deployments

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tweets', tweetRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/oauth',oauthRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
