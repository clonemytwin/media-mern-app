import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";

/* config */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "40mb", extended: ture }));
app.use(bodyParser.urlencoded({ limit: "40mb", extended: ture }));
appuse(cors());
app.use("/assets", express.static(path.join(__dirname, "pubilc/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "pubilc/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// routes//

app.post("/auth/register", upload.single("picture"), register);

// mongoose //

const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URL, {});
