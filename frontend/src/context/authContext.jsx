import { createContext,useEffect,useState } from "react";

export const AuthContext=createContext();


export function AuthProvider({children}){
    const [user,setUser]=useState(null);
    const [userId,setUserId]=useState(null);

      useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedId = localStorage.getItem("userId");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedId) {
      setUserId(storedId);
    }
  }, []);


    return <AuthContext.Provider value={{user,setUser,userId,setUserId}}>{children}</AuthContext.Provider>
}
    
