// Header.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';


import { UserContext } from "../context/UserContext"
import { useNavigate } from 'react-router-dom';

import { IoHomeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";


import { CgProfile } from "react-icons/cg";


const Header = () => {

  const { cartCount } = useContext(UserContext);

  const navigate=useNavigate()

  const logout=()=>{
   localStorage.removeItem("user")
   navigate("/login")
  }

  const data=localStorage.getItem("user")
  const userData = JSON.parse(data);


  return (
    <header className="w-full bg-blue-200 shadow-md sticky">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Content */}
        <Link to="/">
        <div className="text-2xl font-bold text-gray-800">
          <span className="text-green-400 text-3xl md:text-4xl font-bold">
            Shoup<span className="text-yellow-400">Now</span> 
          </span>
        </div>
        </Link>

        {/* Center Content */}
        <div className="hidden md:flex space-x-6">

        <Link to="/">
          <div className='flex flex-col'>
            <IoHomeOutline className="h-6 w-10 text-blue-700"/>
            <span href="/" className="text-gray-800 font-bold hover:text-gray-800">Home</span>
          </div>
          </Link>
           

          <Link to="/addproduct">
           <div className='flex flex-col items-center'>
              <IoMdAddCircleOutline className="h-6 w-10 text-blue-700"/>
              <span href="/addproduct" className="text-gray-800 font-bold hover:text-gray-800">Add Product</span>
           </div>
           </Link>
          


          
        <Link to="/cart">
          <div className='flex flex-col relative'>
             <IoCartOutline className="h-6 w-10 text-blue-700" />
             <button className="flex items-center justify-center h-9 w-9">
            <span className="absolute top-0  right-0 bg-red-500 h-4 w-4 rounded-full flex justify-center items-center text-white text-[11px] font-semibold">
            { cartCount }
            </span>
            <span  className="text-gray-800 font-bold hover:text-gray-800 ml-1">Cart</span>
          </button> 
          </div>
          </Link> 

          

          
        </div>

        {/* Right Content */}
        <div className="hidden md:flex items-center space-x-4">
          <div className='flex flex-col items-center'>
            <CgProfile className="h-6 w-10 text-blue-700" />
            <span>Name:{userData?.user?.fullname}</span>
          </div>

          <button onClick={logout} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Log Out</button>
        </div>

        </div>
    </header>
  );
};

export default Header;
