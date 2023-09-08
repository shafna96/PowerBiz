import express from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import generalRoutes from "./routes/general.js";
import clientRoutes from "./routes/client.js";
import productRoutes from "./routes/product.js";
// data imports

/* CONFIGURATION */
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*  ROUTES */
app.use("/auth", authRoutes);
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/product", productRoutes);
app.use(
  "/uploads",
  express.static(resolve(__dirname, "../client/public/uploads"))
);
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
