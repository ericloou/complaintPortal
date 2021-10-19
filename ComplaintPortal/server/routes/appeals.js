import express from "express";
import {
	getAppeals,
	createAppeals,
	updateAppeals,
	deleteAppeals,
} from "../controllers/appeals.js";

const router = express.Router();
router.get("/", getAppeals);
router.post("/", createAppeals);
router.put("/", updateAppeals);
router.delete("/", deleteAppeals);
export default router;
