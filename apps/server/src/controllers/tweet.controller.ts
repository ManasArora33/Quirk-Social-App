import { Request, Response } from "express";
import Tweet from "../models/Tweet.model";
import Follow from "../models/Follow.model";
import Like from "../models/Like.model";
export const createTweet = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const authorId = req.user._id;

    if (!text || text.trim() === '') return res.status(400).json({ message: 'Tweet Text cannot be empty' });

    const newTweet = new Tweet({
      author: authorId,
      text
    })

    await newTweet.save();

    res.status(200).json(newTweet);
  } catch (error) {
    res.status(500).json({ message: 'Server Error while creating tweet' });
  }
}

export const getAllTweets = async (req: Request, res: Response) => {
  try {
    //Implementing pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const skip = (page - 1) * limit;

    const totalTweets = await Tweet.countDocuments();
    const totalPages = Math.ceil(totalTweets / limit);

    const tweets = await Tweet.find({})
      .populate('author', 'displayName username avatar') // Fetch author details
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(limit) // Apply pagination
      .skip(skip); // Skip previous pages

    // If authenticated, include likedByMe
    if (req.user) {
      const currentUserId = req.user._id;
      const tweetIds = tweets.map(t => t._id);
      const myLikes = await Like.find({ user: currentUserId, tweet: { $in: tweetIds } }).select('tweet');
      const likedSet = new Set(myLikes.map(l => String(l.tweet)));
      const withLiked = tweets.map(t => ({ ...t.toObject(), likedByMe: likedSet.has(String(t._id)) }));
      return res.status(200).json({ tweets: withLiked, currentPage: page, totalPages });
    }

    res.status(200).json({ tweets, currentPage: page, totalPages });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching tweets' });
  }
};

export const getHomeTimeline = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const currentUserId = req.user._id;

    const followingList = await Follow.find({ follower: currentUserId });
    const followingIds = followingList.map((follow) => follow.following);

    followingIds.push(currentUserId);

    //  console.log('Searching for tweets from these author IDs:', followingIds);
    // pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;


    // timeline tweets 
    const timelineTweets = await Tweet.find({ author: { $in: followingIds } })
      .populate('author', 'displayName username avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    // Compute likedByMe
    const tweetIds = timelineTweets.map(t => t._id);
    const myLikes = await Like.find({ user: currentUserId, tweet: { $in: tweetIds } }).select('tweet');
    const likedSet = new Set(myLikes.map(l => String(l.tweet)));
    const withLiked = timelineTweets.map(t => ({ ...t.toObject(), likedByMe: likedSet.has(String(t._id)) }));

    res.status(200).json(withLiked);

  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching home timeline' });
  }
}

export const getUserTweets = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Fetch user's tweets (sorted by latest first)
    const tweets = await Tweet.find({ author: userId })
      .populate('author', 'displayName username avatar')
      .sort({ createdAt: -1 })
      .limit(50);

    // If requester is authenticated, include likedByMe
    if (req.user) {
      const currentUserId = req.user._id;
      const tweetIds = tweets.map(t => t._id);
      const myLikes = await Like.find({ user: currentUserId, tweet: { $in: tweetIds } }).select('tweet');
      const likedSet = new Set(myLikes.map(l => String(l.tweet)));
      const withLiked = tweets.map(t => ({ ...t.toObject(), likedByMe: likedSet.has(String(t._id)) }));
      return res.status(200).json(withLiked);
    }

    return res.status(200).json(tweets);
  } catch (error) {
    console.error('getUserTweets error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const likeTweet = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'User not authenticated' });
    const { id } = req.params;
    const userId = req.user._id;

    // Create like if not exists
    const existing = await Like.findOne({ user: userId, tweet: id });
    if (existing) {
      const tweet = await Tweet.findById(id).select('likeCount');
      return res.status(200).json({ liked: true, likeCount: tweet?.likeCount ?? 0 });
    }

    await Like.create({ user: userId, tweet: id });
    const updated = await Tweet.findByIdAndUpdate(id, { $inc: { likeCount: 1 } }, { new: true }).select('likeCount');
    return res.status(200).json({ liked: true, likeCount: updated?.likeCount ?? 0 });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while liking tweet' });
  }
};

export const unlikeTweet = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'User not authenticated' });
    const { id } = req.params;
    const userId = req.user._id;

    const deleted = await Like.findOneAndDelete({ user: userId, tweet: id });
    if (!deleted) {
      const tweet = await Tweet.findById(id).select('likeCount');
      return res.status(200).json({ liked: false, likeCount: tweet?.likeCount ?? 0 });
    }

    const updated = await Tweet.findByIdAndUpdate(id, { $inc: { likeCount: -1 } }, { new: true }).select('likeCount');
    return res.status(200).json({ liked: false, likeCount: updated?.likeCount ?? 0 });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while unliking tweet' });
  }
};
