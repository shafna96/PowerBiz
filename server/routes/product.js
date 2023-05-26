import express from "express";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/product.js";

const router = express.Router();

router.get("/items", getItems);
router.post("/items", addItem);
router.delete("/items/:id", deleteItem);
router.put("/items/:id", updateItem);
export default router;
