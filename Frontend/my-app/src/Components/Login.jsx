import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
    const [Email, setEmail] = useState("");
    const [Password,setPassword]=useState("")
const navigate=useNavigate()
    const LoginHandler=(e)=>{
   e.preventDefault();
   fetch(`${import.meta.env.VITE_BACKEND_URL}/Login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ Email, Password }),
})
     .then((res) => res.json())
  .then((data) => {
    if (data.message === "success") {
      alert(`Welcome ${data.user.Name}`);
      navigate("/");
    }
  })
    .catch((err) => {
    console.error("Signup error:", err);
  });
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 via-indigo-800 to-blue-700 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-black mb-6">🔐 Login</h2>

        <form className="flex flex-col gap-4" onSubmit={LoginHandler}>
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-xl bg-white bg-opacity-20 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-400 border-2 border-black" required
          value={Email}
          onChange={(e)=>setEmail(e.target.value)}
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
            Login
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-center text-indigo-300">
          Don’t have an account? <Link to="/Signup" className="underline cursor-pointer text-black">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
