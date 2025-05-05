import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        enum: ['Food', 'Travel', 'Lifestyle', 'Finance', 'Business', 'Entertainment', 'General'],
        default: 'General',
        required: true
    }
}, { timestamps: true });

export const Post = mongoose.model("Post", PostSchema);
