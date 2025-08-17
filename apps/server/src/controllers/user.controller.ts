import { Request, Response } from "express";
import Follow from "../models/Follow.model";
import User from "../models/User.model";
export const followUser = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const userToFollowId = req.params.id;
        const followerId = req.user._id;

        // check if user is trying to follow themself
        if (userToFollowId === String(followerId)) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }

        // check if user is already following the userToFollow
        const existingFollow = await Follow.findOne(
            {
             follower: followerId,
             following: userToFollowId 
            } 
        );
        if (existingFollow) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        // create a new follow document
        await Follow.create({
            follower: followerId,
            following: userToFollowId
        })

        // updating follower and following count
        await User.findByIdAndUpdate(followerId, { $inc: { followingCount: 1 } });
        await User.findByIdAndUpdate(userToFollowId, { $inc: { followersCount: 1 } });

        res.status(200).json({ message: 'User followed successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error while following user' });
    }
}

export const unfollowUser = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const userToUnfollowId = req.params.id;
        const followerId = req.user._id;

        const followRecord = await Follow.findOneAndDelete({
      follower: followerId,
      following: userToUnfollowId,
    });

    if (!followRecord) {
      return res.status(400).json({ message: 'You are not following this user' });
    }

    await User.findByIdAndUpdate(followerId, { $inc: { followingCount: -1 } });
    await User.findByIdAndUpdate(userToUnfollowId, { $inc: { followersCount: -1 } });

    res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while unfollowing user' });
    }
}


export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const currentUserId = req.user._id; // protect middleware se milega

    // Username se user find karo
    const user = await User.findOne({ username }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if current user is following this user
    // Abhi hardcoded false kar rahe hain, Follow model implement karne ke baad ye logic add karenge
    const followRecord = await Follow.findOne({ follower: currentUserId, following: user._id }); // TODO: Follow model se check karo

    const isFollowing = followRecord ? true : false;

    // User profile data prepare karo - tumhare model ke according
    const userProfile = {
      _id: user._id,
      displayName: user.displayName,
      username: user.username,
      email: user.email,
      bio: user.bio || `Hello! I'm ${user.displayName}`,
      avatar: user.avatar,
      banner: user.coverPhoto, // coverPhoto ko banner ke naam se bhej rahe hain frontend compatibility ke liye
      createdAt: user.createdAt || null,
      followersCount: user.followersCount,
      followingCount: user.followingCount,
      tweetsCount: 0, // Frontend me update ho jayega tweets fetch ke baad
      isVerified: user.isVerified
    };

    return res.status(200).json({
      user: userProfile,
      isFollowing
    });
  } catch (error) {
    console.error('getUserByUsername error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
