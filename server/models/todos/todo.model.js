import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    title:{
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
    },
    subTodos: [{
        type:mongoose.Types.ObjectId,
        ref:"SubTodo"
    }]
},{timestamps:true});

export default mongoose.model('Todo',todoSchema);