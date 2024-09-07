import express from "express";
import multer from "multer";
import { connectDB } from "./data/database.js";
import dotenv from "dotenv"
import AuthRoutes from "./routes/auth.js"
import UserRoutes from "./routes/users.js"
import PostRoutes from "./routes/posts.js"
import CategoryRoutes from "./routes/categories.js"
import path from "path"
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);

dotenv.config({path:'./.env'});

const app=express();
app.use(express.json());

app.use("/images",express.static(path.join(__dirname,"/images")));
connectDB();

const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://blog-application-pv4n.onrender.com' // Your deployed frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
});

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded!");
});

app.use("/api/v1/auth",AuthRoutes);
app.use("/api/v1/user",UserRoutes);
app.use("/api/v1/post",PostRoutes);
app.use("/api/v1/categories",CategoryRoutes);

//use the client app
app.use(express.static(path.join(__dirname,"/client/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"client/dist/index.html"));
});

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`server is running on port ${process.env.SERVER_PORT} successfully`);
});
