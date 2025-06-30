import { createContext,useState,useEffect,useContext} from "react";

const AuthContext= createContext()
export const AuthProvider=({children})=>{

    const[user,setUser]=useState({
      Name:"",
      dob:"",
      age:"",
    });

    useEffect(()=>{
   const storedUser= JSON.parse(localStorage.getItem("userAuth"))
   if(storedUser){
    setUser(storedUser)
   }
    },[])

    const Login=(userData)=>{
        localStorage.setItem("userAuth",JSON.stringify(userData))
  setUser(userData)
    }
    const Logout=()=>{
    localStorage.removeItem("userAuth")
    setUser(null)
    }
    const userProfile=(data)=>{
      setUser((previousUser)=>{
          const updatedUser= {...previousUser,...data}
             localStorage.setItem("userAuth", JSON.stringify(updatedUser));
    return updatedUser;
      })


    }


return(
    <AuthContext.Provider value={{ user, Login, Logout ,userProfile}}>
      {children}
    </AuthContext.Provider>
  );

}
export const useAuth=()=>useContext(AuthContext);