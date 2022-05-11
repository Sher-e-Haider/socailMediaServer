import mongoose from "mongoose";

const Authuser = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    
},
    {
        timeStams:true
    }
)

const User = mongoose.model('User',Authuser)
export default User