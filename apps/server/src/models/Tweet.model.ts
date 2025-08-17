import mongoose,{Schema,Document} from "mongoose";
import { IUser } from "./User.model";
export interface ITweet extends Document{
    author: IUser['_id'];
    text?: string; // optional coz retweet has no text
    media: {url: string,type: 'image' | 'video'}[];

    // For distinguishing tweet types
    parentTweet?: ITweet['_id']; // If it's a reply, this links to the original tweet
    originalTweet?: ITweet['_id']; // If it's a retweet, this links to the original tweet

    // Denormalized counts for high-performance reads
    likeCount: number;
    retweetCount: number;
    replyCount: number;
    bookmarkCount: number;

}

// mongoose schema

const tweetSchema: Schema<ITweet> = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        maxlength: 280
    },
    media: [{
        url: String,
        type: {type: String, enum: ['image', 'video']}
    }],
    parentTweet: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    originalTweet: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    likeCount: {
        type: Number,
        default: 0
    },
    retweetCount: {
        type: Number,
        default: 0
    },
    replyCount: {
        type: Number,
        default: 0
    },
    bookmarkCount: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

const Tweet = mongoose.model<ITweet>('Tweet', tweetSchema);
export default Tweet;