import express from "express";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
const router=express.Router();

//create-post
router.post("/create",async(req,res)=>{
    try {
        const { title, desc, username, author, categories, photo } = req.body;
        
        // Validate required fields
        if (!title || !desc || !username || !author) {
            return res.status(400).json({ 
                message: "Missing required fields",
                error: "Title, description, username, and author are required"
            });
        }

        const newPost = new Post({
            title,
            desc,
            username,
            author,
            categories: categories || 'General',
            photo: photo || ''
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ 
            message: "Error creating post",
            error: err.message 
        });
    }
});

//update
router.put("/:id",async(req,res)=>{
    try{
       const check=await Post.findById(req.params.id);
       if(check.author===req.body.name){
          const updatedpost=await check.updateOne({
            $set: req.body
          }
            );
            res.status(200).json(updatedpost);
       }else{
        res.status(401).json("you are not the author");
       }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
  
//delete post
router.delete("/:id",async(req,res)=>{
    try{
       const check=await Post.findById(req.params.id);
       if(check.author==req.body.name){
            await check.deleteOne();
            res.status(200).json("post has been deleted");
       }else{
        res.status(401).json("you can delete your posts only");
       }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//get-post
router.get("/:id",async(req,res)=>{
    try{
    const post=await Post.findById(req.params.id);
    res.status(200).json(post);
    }catch(err){
       console.log(err);
       res.status(500).json("Login to open your profile");
    }
}); 

//get-all-posts
router.get("/",async(req,res)=>{
    const author=req.query.user;
    const Catid=req.query.cat;
    try{
      let posts;
      if(author){
        posts= await Post.find({author});
      }else if(Catid){
        posts=await Post.find({categories:{
            $in:[Catid]
        },
    });
      }else{
        posts=await Post.find();
      }
      res.status(200).json(posts);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

export default router;