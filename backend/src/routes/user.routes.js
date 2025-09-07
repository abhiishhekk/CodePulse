import express from 'express'
import { getUserContest, getUserProfile } from '../controllers/user.controller.js'

const router = express.Router();

router.get("/:username", getUserProfile);
router.get("/:username/contest", getUserContest);

export default router;