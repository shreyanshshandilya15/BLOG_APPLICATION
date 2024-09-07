import mongoose, { mongo } from "mongoose";

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        default:"",
    }  
},
{timestamps:true},
)

export const User=mongoose.model("User",UserSchema);