import { sign, verify } from 'jsonwebtoken';
import { IUser } from '../models/User.model';

export const generateToken = (user: IUser): string => {
  return sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string): { userId: string } => {
  return verify(token, process.env.JWT_SECRET!) as { userId: string };
};
