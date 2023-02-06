import { Routes, Route} from "react-router-dom";
import React from 'react'
import { Home } from "../pages";
import ChatPage from "../pages/ChatPage";

const Routers = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chat" element={<ChatPage />}/>
      </Routes>
    </div>
  )
}

export default Routers

