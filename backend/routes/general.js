import express from "express";
import { getUser, postUser } from "../controllers/general.js";

const router = express.Router();

router.get("/users", getUser);
router.post("/users", postUser);
export default router;
