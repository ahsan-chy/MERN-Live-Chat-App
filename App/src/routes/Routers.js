import { Routes, Route} from "react-router-dom";
import React from 'react'
import { Home } from "../pages";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Routers = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          
      </Routes>
    </div>
  )
}

export default Routers

