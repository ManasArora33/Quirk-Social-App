import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
    username: string,
    displayName: string,
    email: string,
    password?: string,
    avatar?: string,
    coverPhoto?: string,
    bio?: string,
    followersCount: number,
    followingCount: number,
    isVerified: boolean,
    googleId?: string,
    githubId?: string,
    createdAt: string,
    updatedAt: string 
}
export interface IUserWithPassword extends IUser {
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // Required only for local (email/password) users; not required for OAuth users
        required: function(this: any) {
            return !this.googleId && !this.githubId;
        },
        select: false
    },
    avatar: {
        type: String,
        default: 'default_avatar_url'
    },
    coverPhoto: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: 160
    },
    followersCount: {
        type: Number,
        default: 0
    },
    followingCount: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true
    }
},{
    timestamps: true
})



const User = mongoose.model<IUser>('User',userSchema)
export default User;