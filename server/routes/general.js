import express from "express";
import { getUser, postUser } from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);

// router.get("/users", getUser);
// router.post("/users", postUser);
export default router;
