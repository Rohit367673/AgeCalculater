import mongoose from "mongoose";

const userSchema=  new mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,

})

const userModel=mongoose.model("user",userSchema)
export default userModel 