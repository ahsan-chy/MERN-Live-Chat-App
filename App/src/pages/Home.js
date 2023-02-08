import React from 'react'
import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import {nanoid} from "nanoid"
import Chat from '../components/Chat';

//no dotenv
const socket = io.connect("http://localhost:5000");
// console.log("Socket", socket)
const Home = () => {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const sendChat = (e) => {
    e.preventDefault();
    if(userName !== "" && room !== "")
    {
      socket.emit("join_room",room)
      // setUserName('')
      // setRoom('')
      setShowChat(true)
    }
  }
  return (
    <div className='container'>
      <div className="container ">
        <div className='border py-2 m-5 border-1 rounded-3 ms-auto me-auto  shadow-sm  w-50'>
        {showChat === false ?
        <div>
          <h2 className='text-info'>Chat App</h2>
          <div className='mx-5 mb-3'>
          <form onSubmit={sendChat}>
            <div className="mb-3">
              <input type="text" className="form-control"  
                  name="chat"
                  placeholder='UserName'
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value)
                  }}
              />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control"  
                  name="room"
                  placeholder='Room ID'
                  value={room}
                  onChange={(e) => {
                    setRoom(e.target.value)
                  }}
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Join Chat</button>
          </form>
          </div>
        </div>
        :
          <Chat socket={socket} userName={userName} room={room}/>
        }
        </div>
      </div>

    </div>
  )
}

export default Home