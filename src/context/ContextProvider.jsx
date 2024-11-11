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
    useEffect(()=>{
      const verifyUser = async()=>{
        try {
          const res = await axios.get("https://notes-app-backend-aiys.onrender.com/api/auth/verify",{headers :{ Authorization:`Bearer ${localStorage.getItem("token")}`}})
          if(res.data.success){
            SetUser(res.data.user)
          }
        } catch (error) {
          SetUser(null)
        }
      }
      verifyUser()
    },[])
  return (
   <authContext.Provider value={{user , login,handleLogout}}>   
   {children}
   </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)