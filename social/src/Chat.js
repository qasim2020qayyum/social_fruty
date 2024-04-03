import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:5000", { transports: ["websocket"] });
const Chat = ({ toggleFullChat, showChat }) => {
  const [showFullChat, setShowFullChat] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");
  console.log("socket: ", socket);
  useEffect(() => {
    // Fetch initial messages
    socket.on("init", (data) => {
      setMessages(data);
    });
    // Listen for new messages
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    // Prompt user for their name
    // const name = prompt("Enter your name");
    // setUser("Qasim");
    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("message", { user, message: input });
      setInput("");
    }
  };


  const toggleChat = () => {
    setShowFullChat(!showFullChat);
  };

  return (
    <div style={{ display: showChat ? "block" : "none" }}>
      <div
        style={{ height: showFullChat ? "3.5rem" : "35rem" }}
        className="chat-container"
      >
        <div className="chat-heading">
          <h5 >
            Qasim
            <i
              className="fa fa-circle text-success"
              style={{ fontSize: "10px", position: "fixed" }}
            />
          </h5> 
          <h5>
            <i style={{marginRight:'6px'}} onClick={toggleChat} className="fa fa-minus text-light" />
            <i onClick={() => toggleFullChat(false)} className="fa fa-times text-light" />
          </h5>  
        </div>

        <div className="chat-list"> 

          {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}: </strong>
            {msg.message}
          </div>
        ))}
        </div>
        <form>
          <input
            id="chatInput"
            type="text"
            value={user}
            placeholder="Your name"
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            id="chatInput"
            type="text"
            value={input}
            placeholder="Your message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button> 
        </form>
      </div>
    </div>

    // <div >
    //   <h1>Chat App</h1>
    //   <div>
    //     {messages.map((msg, index) => (
    //       <div key={index}>
    //         <strong>{msg.user}: </strong>
    //         {msg.message}
    //       </div>
    //     ))}
    //   </div>
    //   <input
    //     type="text"
    //     value={user}
    //     onChange={(e) => setUser(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     value={input}
    //     onChange={(e) => setInput(e.target.value)}
    //   />
    //   <button onClick={sendMessage}>Send</button>
    // </div>
  );
};
export default Chat;