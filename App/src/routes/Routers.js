import { Routes, Route} from "react-router-dom";
import React from 'react'
import { Home } from "../pages";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { ToastContainer } from "react-toastify";
import ResetPassword from "../components/account/RestPassword";

const Routers = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="*" element={<Home/>}/>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default Routers

