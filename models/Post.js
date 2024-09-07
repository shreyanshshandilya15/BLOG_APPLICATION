import mongoose, { mongo } from "mongoose";

const PostSchema=new mongoose.Schema({
      title:{
        type:String,
        required:true
      },
      description:{
        type:String,
        required:true,
      },
      photo:{
        type:String,
        required:false,
      },
      author:{
        type:String,
        required:true
      },
      categories:{
        type:Array,
        required:false
      }
},{timestamps:true}
)

export const Post=mongoose.model("Post",PostSchema);
