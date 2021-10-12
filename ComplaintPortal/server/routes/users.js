import express from "express";
import { createUser, getUser } from "../controllers/users.js";

const router = express.Router();
router.post("/login", getUser);
router.post("/", createUser);
export default router;
