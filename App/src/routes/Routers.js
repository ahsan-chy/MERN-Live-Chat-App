import { Routes, Route} from "react-router-dom";
import React from 'react'
import { Home } from "../pages";

const Routers = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default Routers

