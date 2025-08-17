import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User.model';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token; // Cookie se token le rahe

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // User DB se laa ke req.user me store kar rahe
    const dbUser = await User.findById(decoded.userId).select('-password');

    if (!dbUser) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = dbUser;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid or expired' });
  }
};
