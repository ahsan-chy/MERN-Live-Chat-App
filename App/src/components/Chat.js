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
        <div className=' m-5 ms-auto me-auto  '>
            <div className="chat-header">
                <h2 className='text-info'>Chat App</h2>
            </div>
            <div className="chat-body">
            <ScrollToBottom className="message-container">
                {messageList.map((messageContent, index)=> (
                        // <h2 key={index}>{m.message}</h2>
                        <div className="message"
                        id={userName === messageContent.author ? 'you': 'other'}
                        >
                            <div>
                                <div className='message-content'>
                                    <p>{messageContent.message}</p>
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

        <div className='mx-5 mb-3'>
          <form onSubmit={sendMessage}  class="d-flex justify-content-between">
            <div className="mb-3 col-auto w-75">
              <input type="text" className="form-control"  
                  name="chat"
                  placeholder='Chat Message'
                  value={currentMessage}
                  onChange={(e) => {
                    setCurrentMessage(e.target.value)
                  }
                  }
              />
              </div>
               <div class="col-auto">
                    <button type="submit" className="btn btn-success"> Send 
                        <img src='https://cdn-icons-png.flaticon.com/512/9226/9226997.png' alt='send' width="20"/>
                    </button>
            </div>
            
          </form>
        </div>
        </div>

  )
}

export default Chat
