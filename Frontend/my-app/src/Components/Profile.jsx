import React from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Optional icon (you can also use emoji or SVG)

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  function parseDOB(dobString) {
  const [day, month, year] = dobString.split("-");
  return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
}
const dayForBirthday = (() => {

  if (!user?.dob) return null;

  const birthDate = parseDOB(user.dob); // ✅ use fixed format
  if (isNaN(birthDate)) return null;

  const today = new Date();

 

  const currentYearBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  const nextBirthday =
    currentYearBirthday < today
      ? new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate())
      : currentYearBirthday;

  const diffInTime = nextBirthday.getTime() - today.getTime();
  return Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
})();



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-blue-600 flex items-center justify-center px-4 py-10 relative">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white flex items-center space-x-2 hover:font-bold cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 cursor-pointer" /> {/* Or use: <span>←</span> */}
        <span>Home</span>
      </button>

      {/* 👤 Profile Card */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center space-y-6">
        
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.Name[0]}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-indigo-700">{user.Name}</h1>
        <p className="text-sm text-gray-500">Your personal birthday dashboard 🎂</p>

        <div className="bg-gray-100 p-5 rounded-xl space-y-4 text-left text-gray-800 shadow-inner">
          <div className="flex justify-between">
            <span className="font-medium">Date of Birth:</span>
            <span>{user.dob}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Current Age:</span>
            <span>{user.age} years</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Days Until Next Birthday:</span>
            <span>{dayForBirthday}days</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-1">Birthday Countdown</p>
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-3 w-[30%] rounded-full"></div>
          </div>
        </div>

        <div className="pt-4">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-indigo-700 transition">
          <Link to="/">Check Again</Link>  
          </button>
        </div>
      </div>
    </div>
  );
}
