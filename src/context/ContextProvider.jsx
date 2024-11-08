import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { createContext, useContext } from 'react'
const authContext = createContext()
export const ContextProvider = ({children}) => {
    const [user,SetUser] = useState(null)
    
    const login =  (user) => {
    SetUser(user)}
    const handleLogout=()=>{
      localStorage.removeItem('token')
      SetUser(null)

    }
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        verifyUser(); // Verify token on page load if it exists
      }
    }, []);
    
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
    
      if (!token) {
        SetUser(null); // No token, no user
        return;
      }
    
      try {
        const res = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          SetUser(res.data.user);
        }
      } catch (error) {
        console.error("Verification failed:", error.response ? error.response.data : error.message);
        SetUser(null); // Reset user if verification fails
      }
    };
    
    
  return (
   <authContext.Provider value={{user , login,handleLogout}}>   
   {children}
   </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)