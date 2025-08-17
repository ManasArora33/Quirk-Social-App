import { Router } from "express";
import { followUser, getUserByUsername, unfollowUser } from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post('/:id/follow',protect, followUser)
router.delete('/:id/follow',protect, unfollowUser)
router.get('/:username',protect, getUserByUsername)
export default router;