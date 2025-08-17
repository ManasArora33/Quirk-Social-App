import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User.model';
import { ITweet } from './Tweet.model';

export interface ILike extends Document {
  user: IUser['_id'];
  tweet: ITweet['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const likeSchema: Schema<ILike> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    tweet: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Ensure a user can like a tweet only once
likeSchema.index({ user: 1, tweet: 1 }, { unique: true });

const Like = mongoose.model<ILike>('Like', likeSchema);
export default Like;
