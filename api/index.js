import express from "express";
import multer from "multer";
import { connectDB } from "./data/database.js";
import dotenv from "dotenv"
import AuthRoutes from "./routes/auth.js"
import UserRoutes from "./routes/users.js"
import PostRoutes from "./routes/posts.js"
import CategoryRoutes from "./routes/categories.js"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname= dirname(__filename);

dotenv.config();
const app=express();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")));
connectDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5173");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS" // Add DELETE method here
      );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With,Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  })

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

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`server is running on port ${process.env.SERVER_PORT} successfully`);
});