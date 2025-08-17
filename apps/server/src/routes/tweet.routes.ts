import { Router } from "express";
import { createTweet, getAllTweets, getHomeTimeline, getUserTweets, likeTweet, unlikeTweet } from "../controllers/tweet.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/",protect,createTweet);
router.get("/",protect,getAllTweets);
router.get('/timeline',protect,getHomeTimeline);
router.get('/user/:userId', protect, getUserTweets);

// Likes
router.post('/:id/like', protect, likeTweet);
router.delete('/:id/like', protect, unlikeTweet);

export default router;