import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";

//Import routes files
import loginRoutes from "./routes/authRoutes.js";
import upload1 from "./controllers/uploadCtrl.js";
import fileUpload from "express-fileupload";

//Configure
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//Store images
const storage = multer.diskStorage({
  destination: function (req, file, des) {
    des(null, "public/assets"); //set assests folder
  },
  filename: function (req, file, des) {
    des(null, file.originalname);
  },
});
const upload = multer({ storage });

//Routes
app.post("/auth/register", register);
app.use("/auth", loginRoutes);
app.use("/images/upload", upload1.upload);

//static files
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
}); 


//Mongoose connection
const PORT = process.env.PORT || 3001;  //keep backup port to run the server
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`MongoDB connected on Port: ${PORT}`));
   })
.catch((error) => console.log("MongoDB connection Failed...", error.message));