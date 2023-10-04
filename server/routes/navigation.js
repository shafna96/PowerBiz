import express from "express";
import { getNavigations, verifyToken } from "../controllers/navigation.js";

const router = express.Router();

router.get("/navigation", verifyToken, getNavigations);
export default router;
