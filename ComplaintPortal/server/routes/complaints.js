import express from 'express';
import { getComplaints, createComplaint, updateComplaint } from '../controllers/complaints.js';

const router = express.Router();
router.get('/', getComplaints);
router.post('/', createComplaint);
router.put('/', updateComplaint);
export default router;