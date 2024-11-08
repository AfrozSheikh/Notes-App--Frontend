import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

export const Navbar = ({setQuery}) => {
  const { user ,handleLogout} = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-blue-300 transition-colors">
          NoteApp
        </Link>
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <input
        onChange={(e)=> setQuery(e.target.value)}
          type="text"
          placeholder="Search notes..."
          className="w-full p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      
      {/* Authentication Links */}
      <div>
        {!user ? (
          <div className="flex space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-md bg-white text-blue-600 font-semibold hover:bg-blue-500 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="font-semibold">
              {user.name}
            </span>
            <button 
            onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
