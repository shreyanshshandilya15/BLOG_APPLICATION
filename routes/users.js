import express from "express"
import { User } from "../models/User.js";
import {Post} from "../models/Post.js"
import bcrypt from "bcryptjs"

const router = express.Router();

//update
router.put("/:id", async (req, res) => {
    if (req.body.userId.toString()=== req.params.id.toString()) {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        try {
            const updateduser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updateduser);
        } catch (err) {
            console.log("error updating user",err);
            res.status(500).json({err:"Internal server error"});
        }
    } else {
        res.status(400).json("You can only update your account");
    }
});

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("user not found");
        }
    } else {
        res.status(500).json("Error occured while deleting!");
    }
});

router.get("/:id",async(req,res)=>{
     try{
     const user=await User.findById(req.params.id);
     const {password,...others}=user._doc;
     res.status(200).json(others);
     }catch(err){
        console.log(err);
        res.status(500).json("Login to open your profile");
     }
});

export default router;