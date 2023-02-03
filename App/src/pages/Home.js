import React from 'react'
import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import {nanoid} from "nanoid"

//no dotenv
const socket = io.connect("http://localhost:5000");
const userName = nanoid(4)

const Home = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {message, userName})


    setMessage('')
  }
  useEffect(() => {
    socket.on("chat",  (payload) => {
      setChat([...chat, payload])
    }
    )
  },[message]);

  return (
    <div className='container'>
      <div className="container ">
        <div className='border py-2 m-5 border-1 rounded-3 ms-auto me-auto  shadow-sm  w-50'>
        <h2 >Chat App</h2>
        {
          chat.map((payload, index) => {
            return(
                <div key={index} className=" w-50 m-3 ms-auto me-auto border rounded-1 px-2 py-1">
                  <span className='text-danger'>{payload.userName}</span> &nbsp;&nbsp;
                  <span >{payload.message}</span>
                </div>
          )})
          }
        <div className='mx-5 mb-3'>
          <form onSubmit={sendChat}>
            <div className="mb-3">
              <input type="text" className="form-control"  
                  name="chat"
                  placeholder='Chat Message'
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                  }
                  }
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Submit</button>
          </form>
        </div>
</div>
      </div>

    </div>
  )
}

export default Home