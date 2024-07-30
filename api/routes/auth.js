import express from "express"
import {User} from "../models/User.js"
import bcrypt from "bcryptjs"

const router=express.Router();

router.post("/register",async(req,res)=>{
       try{
        const {name,email,password}=req.body;
        let user=await User.findOne({email});
        if(user){
            res.status(400).json("already registered");
        }
        const hashedPassword= await bcrypt.hash(password,10);
        user=await User.create({name,email,password:hashedPassword});
         res.status(200).json(user); 
       }catch(err){
        res.status(500).json(err);
        console.log(err);
       }     
});

router.post("/login",async(req,res)=>
{
       try{
          const {name,password}=req.body;
          const user=await User.findOne({name});
          if(!user){
              return res.status(401).json("Register first");
          }
          const isMatch=await bcrypt.compare(password,user.password);
          if(!isMatch){
             return  res.status(400).json("Enter valid credentials");
          }
         return  res.status(200).json(user);
       }catch(err){
              res.status(500).json(err);
              console.log(err);
       }
})

export default router;
