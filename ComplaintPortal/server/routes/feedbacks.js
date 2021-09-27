import express from 'express';
import { getFeedbacks, createFeedbacks } from '../controllers/feedbacks.js';
// import complaint from '../models/complaints.js';

const router = express.Router();
router.get('/', getFeedbacks);
router.post('/', createFeedbacks)
export default router;