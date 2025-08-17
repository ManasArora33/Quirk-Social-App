import jwt from 'jsonwebtoken';
import { IUser } from '../models/User.model';

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
};
