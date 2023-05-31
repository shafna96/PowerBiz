import express from "express";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/product.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/items", upload.single("image"), addItem);
router.get("/items", getItems);
router.delete("/items/:id", deleteItem);
router.put("/items/:id", upload.single("image"), updateItem);
export default router;
