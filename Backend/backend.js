import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "./Modules/User.js";
import cors from "cors"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app= express();
app.use(express.json()); 
const JWT_SECRET = process.env.JWT_SECRET;
const PORT=3001
app.use(cors());
mongoose.connect(process.env.Mongo_URL)
.then(()=>console.log("Mogodb connected"))
.catch((err)=> console.log("error Mongodb connection",err))

app.post("/Start",(req,res)=>{
    console.log("hello")
        res.status(200).json({ message: "setup successfully" });
})
app.post("/Signup",async (req,res)=>{
    try{
          console.log("Request Body:", req.body);
   const {Name,Email,Password}=req.body;
   if(!Name||!Email||!Password){
    return res.status(400).send({ message: "All fields are required!" });
   } 
   const existingUser= await userModel.findOne({Email})
   if(existingUser){
        return res.status(400).send({ message: "Email already exists" });
   }
   const hashPass= await bcrypt.hash(Password,10);
   
   const user= await userModel.create({Name,Email,Password:hashPass})
 
   const token = jwt.sign({ userId: user._id }, JWT_SECRET);
   res.status(200).send({message:"success",   user: {
        Name: user.Name,
        _id: user._id,
      }, token})

}catch(error){
        console.error("Registration error:", error);
    res.status(500).send({ message: "Registration failed!", error: error.message });
  }




})
app.post("/Login", async(req,res)=>{
    try{
    const {Email,Password}=req.body;
    const user = await userModel.findOne({Email})
    if(!user){
        res.status(404)({message:"No Record Found",error:error.message})
    }
    const match= await bcrypt.compare(Password,user.Password)
    if(match){
       const token = jwt.sign({userId:user._id},JWT_SECRET)
       return res.json({message:"success",token,user:{Id:user._id,Name:user.Name,Email:user.Email}})
    }

    
        return res.status(401).json({ message: "Invalid password" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed!", error: error.message });
  }
    

    
})

app.post('/api/celebs', async (req, res) => {
  try {
    const response = await fetch('http://wishiy.com/page/api/today', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response: 'JSON', limit: 10 })
    });
    const json = await response.json();
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch celebs' });
  }
});

app.listen(PORT,()=>{
    console.log("server running in port" ,PORT);
})

  

