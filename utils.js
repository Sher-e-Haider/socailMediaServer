import jwt from 'jsonwebtoken'

export const generateToken =(olduser)=>{
 return jwt.sign({
     _id:olduser._id,
     name:olduser.name,
     email:olduser.email,
     isAdmin:olduser.isAdmin,
 },process.env.JWT_SECRET || 'somesecret',{expiresIn:'1h'}
 )
}