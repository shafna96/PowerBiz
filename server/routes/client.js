import express from "express";
import { addCustomer, getCustomers } from "../controllers/client.js";

const router = express.Router();
router.get("/customers/:id", getCustomers);
router.post("/customers", addCustomer);

export default router;
