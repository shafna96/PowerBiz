import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import generalRoutes from "./routes/general.js";
import authRoutes from "./routes/auth.js";
import navigationRoutes from "./routes/navigation.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*  ROUTES */
app.use("/", generalRoutes);
app.use("/", authRoutes);
app.use("/", navigationRoutes);

/* MYSQL SETUP */
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
