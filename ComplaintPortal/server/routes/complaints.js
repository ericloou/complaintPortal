import express from "express";
import {
	getComplaints,
	createComplaint,
	updateComplaint,
	deleteComplaints,
} from "../controllers/complaints.js";

const router = express.Router();
router.get("/", getComplaints);
router.post("/", createComplaint);
router.put("/", updateComplaint);
router.delete("/", deleteComplaints);
export default router;
