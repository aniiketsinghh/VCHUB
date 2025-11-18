import { createContext,useEffect,useState } from "react";

export const AuthContext=createContext();


export function AuthProvider({children}){
    const [user,setUser]=useState(null);
    useEffect(()=>{
       const userId=localStorage.getItem("userId");
       if(userId){
        setUser(userId);
       } 
    },[]);

    const value={user,setUser};
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
    
