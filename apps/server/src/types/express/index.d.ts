import { IUser } from '../../models/User.model';

declare global {
  namespace Express {
    // Augment the User interface used by passport/express
    // so that req.user has all fields from our Mongoose IUser, including _id
    // Do NOT override Request.user directly to avoid type conflicts
    // with @types/passport which defines Request.user?: User
    interface User extends IUser {}
    // Ensure Request.user is available even without @types/passport
    interface Request {
      user?: User;
    }
  }
}