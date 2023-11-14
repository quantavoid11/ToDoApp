import express from 'express';
import userRouter from "./routes/auth/user.routes.js";
import connectDB from './db/dbConfig.js';
import  dotenv from 'dotenv';

dotenv.config({path:"./.env"});


const app=express();

app.use(express.urlencoded({extended:false}));

    await connectDB();
    app.use('/api/v1/users',userRouter);
  

app.listen(3000,()=>{
    console.log('server listening om port 3000');
})
