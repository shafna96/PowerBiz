import express from "express";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/product.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder for storing the uploaded files
    cb(null, path.join(__dirname, "../../client/public/uploads/"));
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file

    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post("/items", upload.single("image"), addItem);
router.get("/items", getItems);
router.delete("/items/:id", deleteItem);
router.put("/items/:id", upload.single("image"), updateItem);

export default router;
