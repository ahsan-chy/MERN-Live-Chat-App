import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import "./chat.css";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const Chat = ({socket, userName , room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    // const [emoji, setEmoji] = useState("");
    const [selectEmojis, setSelectEmojis] = useState(false)
    const [messageList, setMessageList] = useState([]);

const addEmoji = (e) =>{
    let emoji = e.native
    setCurrentMessage(currentMessage + emoji) 
    console.log("show emojis function", emoji)
    setSelectEmojis(false);
}
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
const showEmojis = () => {
    console.log("show emojis function")
    setSelectEmojis(true);
}
const receiveMessage = () => {
    socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data])
    })
}
useEffect(() => {
    receiveMessage()
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
                        <div className="message" key={index}
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
          <form onSubmit={sendMessage}  className="d-flex">
          <div className="col-1">
          <img src='https://cdn-icons-png.flaticon.com/512/2550/2550370.png' alt='send' className='file-icon'/>
          </div>
            <div className="mb-3 col-8">
              <input type="text" className="form-control w-100"  
                  name="chat"
                  placeholder='Chat Message'
                  value={currentMessage}
                  onChange={(e) => {
                    setCurrentMessage(e.target.value)
                }}
              />
              </div>
              <div className="col-1">
                {selectEmojis ? 
                    <Picker data={data} onEmojiSelect={addEmoji} />
                    :
                    <span className='getEmojiButton' onClick={showEmojis}>
                        <img src='https://cdn-icons-png.flaticon.com/512/742/742923.png' alt='send' className='emoji-icon'/>
                    </span>
                    }
                </div>
               <div className="col-2">
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
