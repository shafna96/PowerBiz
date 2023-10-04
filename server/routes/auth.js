import express from "express";
import { getLogin, getLogout } from "../controllers/auth.js";

const router = express.Router();

//router.post("/signup", getSignup);
router.get("/login", getLogin);
router.post("/logout", getLogout);

export default router;
