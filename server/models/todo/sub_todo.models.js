import mongoose from "mongoose";

const subTodoSchema=new mongoose.Schema({
   description:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

export default mongoose.model('SubTodo',subTodoSchema);