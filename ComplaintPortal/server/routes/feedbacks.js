import express from "express";
import {
	getFeedbacks,
	createFeedbacks,
	updateFeedbacks,
	deleteFeedbacks,
} from "../controllers/feedbacks.js";

const router = express.Router();
router.get("/", getFeedbacks);
router.post("/", createFeedbacks);
router.put("/", updateFeedbacks);
router.delete("/", deleteFeedbacks);
export default router;
