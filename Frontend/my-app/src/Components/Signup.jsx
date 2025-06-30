import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function Signup() {
  const {Login}= useAuth();
 const navigate= useNavigate()
    const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password,setPassword]=useState("")
  const SignupHandler =(e)=>{
   e.preventDefault();

   console.log("value",Name,Email,Password);
   
   fetch(`${import.meta.env.VITE_BACKEND_URL}/Signup`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ Name, Email, Password }),
})
    .then((res) => res.json())
  .then((data) => {
    if (data.message === "success") {
      
      const {user,token}= data;
      
      Login({...user,...token})
      alert(`Welcome ${user.Name}`);
      navigate("/");
    }
  })
    .catch((err) => {
    console.error("Signup error:", err);
  });
}

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 via-indigo-800 to-blue-700 text-black px-4 relative">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white flex items-center space-x-2 hover:font-bold cursor-pointer"
      >
        <span className="text-xl cursor-pointer">←</span>
        <span>Home</span>
      </button>    
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-black mb-6">📝 Sign Up</h2>

        <form className="flex flex-col gap-4" onSubmit={SignupHandler}>
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-xl bg-white bg-opacity-20 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-400 border-2 border-black" required
            value={Name}
            onChange={(e)=>setName(e.target.value)}
          />

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 p-3 rounded-xl bg-white bg-opacity-20 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-400 border-2 border-black" required
            value={Email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <button
              type="button"
              className="bg-indigo-500 px-4 rounded-xl text-white hover:bg-indigo-600 transition"
            >
              Send OTP
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter OTP"
            className="p-3 rounded-xl bg-white bg-opacity-20 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-400 border-2 border-black" required
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl bg-white bg-opacity-20 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-400 border-2 border-black" required
          value={Password}
          onChange={(e)=>setPassword(e.target.value)}
         />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-500 py-3 rounded-xl hover:bg-indigo-600 transition duration-300 text-white"
            
          >
            Sign Up
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-center text-indigo-300">
          Already have an account? <Link to="/Login" className="underline cursor-pointer text-black">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
