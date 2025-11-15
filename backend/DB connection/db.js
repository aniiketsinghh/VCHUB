import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDb= async()=>{
    try{
         const con = await mongoose.connect(process.env.MONGODB_URI);
         console.log(`MongoDB connected: ${con.connection.host}`);
    }catch(err){
        console.error(`Error from db connection: ${err.message}`);
        process.exit(1);
    }
}
export default connectDb;