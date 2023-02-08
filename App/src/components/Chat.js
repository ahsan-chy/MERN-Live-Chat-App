import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import "./chat.css";

const Chat = ({socket, userName , room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    // console.log("Socket Otside useeffect", socket)


const sendMessage = async(e) => {
    e.preventDefault();
    if(currentMessage !== "")
    {
        const messageData = {
            room: room,
            author: userName,
            message: currentMessage,
            time: 
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_message", messageData)
        setMessageList((list) => [...list, messageData])
        setCurrentMessage("")
    }
}
const receiveMessage = () => {
    socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data])
    })
}
useEffect(() => {
    // console.log("First Time Run")
    // console.log("Socket inside useeffect", socket)
    receiveMessage()
    // return console.log("Run Only Once")
}, [socket]);
return (
        <div className=' py-3 ms-auto me-auto px-3 '>
            <div className="chat-header">
                <h2 className='text-info'> ChatSpark 💬 </h2>
            </div>
            <div className="chat-body">
            <ScrollToBottom className="message-container">
                {messageList.map((messageContent, index)=> (
                        // <h2 key={index}>{m.message}</h2>
                        <div className="message"
                        id={userName === messageContent.author ? 'you': 'other'}
                        >
                            <div className='flex'>
                                <div className='message-content'>
                                    <span>{messageContent.message}</span>
                                </div>
                                <div className='message-meta'>
                                    <p id='time'>{messageContent.time}</p>
                                    <p id='author'>{messageContent.author}</p>
                                </div>
                            </div>
                        </div>

                    ))
                }
                </ScrollToBottom>
            </div>

        <div className='my-3'>
          <form onSubmit={sendMessage}  class="d-flex">
            <div className="mb-3 col-10 pe-2">
              <input type="text" className="form-control w-100"  
                  name="chat"
                  placeholder='Chat Message'
                  value={currentMessage}
                  onChange={(e) => {
                    setCurrentMessage(e.target.value)
                  }
                  }
              />
              </div>
               <div class="col-2">
                    <button type="submit" className="btn btn-success w-100">Send 
                         <img src='https://cdn-icons-png.flaticon.com/512/9226/9226997.png' alt='send' className='send-icon'/>
                    </button>
            </div>
            
          </form>
        </div>
        </div>

  )
}

export default Chat
