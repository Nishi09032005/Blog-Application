const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
   
})

//securing password using bcrypt
 userSchema.pre("save",async function(next){
    const user = this
    if(!user.isModified("password")){
        return  next()
    }
        //if password is not modified
   //next refers to next step

    try{
      const saltRound = 10
      const hashedPassword = await bcrypt.hash(user.password,saltRound)
      user.password = hashedPassword
      next()
    }catch(error){
       next(error)
    }
 })
 
 //generate jsonwebtoken method
userSchema.methods.generateToken=async function(){
  try{
   return jwt.sign(
    {
     //payload details
     userId:this._id.toString(),//userid is an object so we convert it into string
     email:this.email,
     
    },
    //passing secret key
    process.env.JWT_SECRET,
    {
      expiresIn:"1d",
    }
   )
  }catch(error){
    console.log(error)
  }
}

 const User = mongoose.model("User",userSchema)
 module.exports = User