import express from 'express';
import { getAppeals, createAppeals } from '../controllers/appeals.js';

const router = express.Router();
router.get('/', getAppeals);
router.post('/', createAppeals)
export default router;