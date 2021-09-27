import express from 'express';
import { getAppeals, createAppeals } from '../controllers/appeals.js';
// import complaint from '../models/complaints.js';

const router = express.Router();
router.get('/', getAppeals);
router.post('/', createAppeals)
export default router;