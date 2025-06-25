import { motion } from 'framer-motion';
import { useState } from 'react';
import { data, Link } from 'react-router-dom';
import { celebData } from "./Celebs";
export default function AgeCalculator() {
  const [UserAge, setUserAge] = useState("")
  const [Current, setCurrent] = useState("")
  const [Celebs, setCelebs] = useState("")
  
const agesubmithandler= async(e)=>{
  e.preventDefault();
  const [year, month, day] = UserAge.split("-");
  const today = new Date();
  const currentmonth=today.getMonth() + 1
  const currentDay = today.getDate();
  // const userMonth= month-currentmonth
  const currentYear = new Date().getFullYear();


  if(currentmonth>=month){
    let approxAge = currentYear - year;

  let age= approxAge+1
  setCurrent(age) 
}else{
  
  let approxAge = currentYear - year;

  let age= approxAge*-1
  setCurrent(age)
  }


setUserAge(" ")
    const formattedMonth = parseInt(month, 10);
    const celebList = celebData[formattedMonth] || [];

    if (celebList.length > 0) {
      const randomCeleb = celebList[Math.floor(Math.random() * celebList.length)];
      setCelebs([`${randomCeleb.name} — "${randomCeleb.quote}"`]);
    } else {
      setCelebs(["No celeb motivation found for this month. Keep pushing yourself!"]);
    }
  };
  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 via-indigo-800 to-blue-700 text-white px-4 relative">

      {/* 🔒 Top-right buttons */}
      <div className="absolute top-6 right-6 flex gap-4">
        <button className="bg-white text-indigo-800 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition duration-300 cursor-pointer">
          <Link to="/Login">Login</Link>
        </button>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-600 transition duration-300 cursor-pointer">
          Profile
        </button>
      </div>

      {/* 🔮 Main Heading */}
      <h1 className="mb-14 text-white font-bold text-3xl text-center">
        Your Birthdate Is Special — See Who Shares It!
      </h1>

      {/* 🎉 Card UI */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center text-black mb-6">✨ Age Calculator</h1>

        <form onSubmit={agesubmithandler}>
          <div className="flex flex-col gap-4">
            <input
              type="date"
              className="p-3 rounded-xl bg-white bg-opacity-20 text-black placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Select your birthdate"
              value={UserAge}
              onChange={(e) => setUserAge(e.target.value)}
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-500 py-3 rounded-xl hover:bg-indigo-600 transition duration-300"
            >
              🔍 Calculate Age
            </motion.button>
          </div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center"
        >
          {Current && (
            <p className="text-lg text-black">
              🎂 You are  <span className="font-bold text-yellow-300">{Current}</span> years old.
            </p>
          )}

          {Celebs.length > 0 && (
            <div className="mt-4 text-black">
              <h2 className="text-xl font-semibold mb-2">🔥 Motivational Vibe for Your Month:</h2>
              <ul className="list-disc list-inside">
                {Celebs.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* 👣 Footer */}
      <footer className="mt-10 text-sm text-gray-200">© 2025 R7BR</footer>
    </div>
  );
}
