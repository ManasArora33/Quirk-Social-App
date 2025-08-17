import mongoose,{Schema,Document} from "mongoose";
import { IUser } from "./User.model";

export interface IFollow extends Document {
    follower: IUser['_id'];
    following: IUser['_id'];
}

const followSchema: Schema<IFollow> = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow = mongoose.model<IFollow>('Follow', followSchema);

export default Follow;