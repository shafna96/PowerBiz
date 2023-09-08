import express from "express";
import {
  addCustomer,
  addSupplier,
  deleteCustomer,
  deleteSupplier,
  getCustomers,
  getSuppliers,
  updateCustomer,
  updateSupplier,
} from "../controllers/client.js";

const router = express.Router();

/* customers routes */
router.get("/customers", getCustomers);
router.post("/customers", addCustomer);
router.delete("/customers/:id", deleteCustomer);
router.put("/customers/:id", updateCustomer);

/* supplier routes */
router.get("/suppliers", getSuppliers);
router.post("/suppliers", addSupplier);
router.delete("/suppliers/:id", deleteSupplier);
router.put("/suppliers/:id", updateSupplier);

export default router;
