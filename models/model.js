import mongoose from "mongoose";

// const user =new mongoose.Schema({
//     title:String,
//     note: String,
//     name: String,
//     creator: String,
//    },
// {
//    createdAt:{
//          type:Date,
//          default:new Date()
//     }
      
// }
      
    

// )

// const UserSchema = mongoose.model('UserSchema',user)

// export default UserSchema




const postSchema = mongoose.Schema({
    title:String,
    message:String,
    name:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:[String],
        default:[],
    },
    comments: { type: [String], default: [] },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const PostMessage = mongoose.model('PostMessage',postSchema)

export default PostMessage