//import UserSchema from '../models/model.js'

// export const getPost = async(req,res)=>{
//     const user =  await UserSchema.find()
//     try {
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(400).json({message:error})
//     }
// }

// export const createPost = async(req,res)=>{
//     const post = req.body
//     const newPost = await new UserSchema({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
//     //const user =  await new UserSchema(post)
//     try {
//        await newPost.save()
//        res.status(201).json(newPost)
//     } catch (error) {
//         res.status(400).json({message:error})
//     }
// }

// export const deletePost = async(req,res)=>{
//    const id=req.params.id
   
//     try {
//         const user =  await UserSchema.findByIdAndRemove(id)
//        res.status(200).json({message:'deleted'})
//     } catch (error) {
//         res.status(400).json({message:error})
//     }
// }

// export const updatePost = async(req,res)=>{
//     const id=req.params.id
//     const {title,note}= req.body
    
//      try {
//          const user =  await UserSchema.findByIdAndUpdate(id,{title:title,note:note},{new:true})
//         res.status(202).json({message:'updated'})
//      } catch (error) {
//          res.status(401).json({message:error})
//      }
//  }



 import  mongoose  from "mongoose";
import PostMessage from "../models/model.js"

export const getPosts = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});
       
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
       
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
       // console.log({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}



export const getPost =async (req,res)=>{
    const {id} = req.params
    try {
        const postMessages = await PostMessage.findById(id);
       //console.log(postMessages);
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message:error.message})
    }                  
}

export const createPost =async (req,res)=>{
   const post = req.body;
   const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
   

   try {
       await newPost.save();
       res.status(201).json(newPost)
   } catch (error) {
       res.status(409).json({message:error.message})
   }
}

// export const updatePost =async (req,res)=>{
//     const {id:_id} = req.params;
//     const post = req.body;

//     if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with the Id')

//     const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post,_id },{new:true})
//     res.json(updatedPost)
// }

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}


export const deletePost =async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with the Id')

    await PostMessage.findByIdAndRemove(id)
    console.log("delete");
    res.json({message:'Post deleted successfully'})
}


export const likePost =async (req,res)=>{
    const { id } = req.params;
  
    if(!req.userId) return res.json({message:'Unauthenticate'})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with the Id')

    const post = await PostMessage.findById(id);
    const index = post?.likes?.findIndex((id)=>id===String(req.userId));

    if(index===-1){
        post.likes.push(req.userId)
    }else{
        post.likes=post.likes.filter((id)=>id!==String(req.userId))
    }
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post,{new:true})
    res.json(updatedPost)
}


export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};


