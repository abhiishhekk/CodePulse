import express from 'express'
import { getUserContest, getUserProfile } from '../controllers/user.controller.js'
import { getUserStreak } from '../controllers/streak.controller.js';
const router = express.Router();

router.get("/:username", getUserProfile);
router.get("/:username/contest", getUserContest);
router.get("/:username/streak", getUserStreak);
export default router;