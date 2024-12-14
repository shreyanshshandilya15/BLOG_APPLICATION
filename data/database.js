import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName:"blog-application"
        });
        console.log(`connected with database ${mongoose.connection.host} succesfully`);
    }catch(err){
        console.log(err);
    }
}
 