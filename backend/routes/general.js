import express from "express";
import { getUser } from "../controllers/general";

const router = express.Router();

router.get("/users", getUser);

export default router;
