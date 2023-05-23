import express from "express";
import {
  addCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/client.js";

const router = express.Router();
router.get("/customers", getCustomers);
router.post("/customers", addCustomer);
router.delete("/customers/:id", deleteCustomer);
router.put("/customers/:id", updateCustomer);

export default router;
