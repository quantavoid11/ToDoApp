import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    },
    emailVerificationToken:{
        type:String
    },
    emailExpiryToken:{
        type:Date
    }
    

},{timestamps:true})

const User=mongoose.model('user',userSchema);

export default User;