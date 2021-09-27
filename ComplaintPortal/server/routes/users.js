import express from "express";
import { getComplaints, createComplaint } from "../controllers/complaints.js";
import { createUser } from "../controllers/users.js";
// import complaint from "../models/complaints.js";

const router = express.Router();
router.get("/", getComplaints);
router.post("/", createComplaint);

//router.get("/", getComplaints);
router.post("/", createUser);
export default router;
