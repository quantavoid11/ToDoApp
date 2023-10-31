import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config({path:"../.env"});

let dbInstance=undefined;

const connectDB = async () => {
    try {
    
        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URL
        )
        dbInstance=connectionInstance
        console.log(
            `\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`
        );

    } catch (error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;

