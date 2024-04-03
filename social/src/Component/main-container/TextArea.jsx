import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { chatboxAction, chatboxToggleAction } from "../../redux/action";

const socket = io(`${process.env.REACT_APP_BASE_URL}`, {
  transports: ["websocket", "polling", "flashsocket"],
});
// mongodb+srv://frutychat:qasimchat@cluster0.un5xuao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://frutychat:<password>@cluster0.un5xuao.mongodb.net/
// MONGO_URI=mongodb://localhost:27017/fruitsauction
const TextArea = () => {

  
  const chatboxToggle = useSelector((state) => state.chatboxReducer);
  const showChat = useSelector((state) => state.chatboxToggleReducer);
  const reciever = useSelector((state) => state.recieverIdReducer);
  const loggedInUser = useSelector((state) => state.loginUserReducer);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");
  console.log("socket: ", socket);
  
  useEffect(() => {
    socket.emit("new-user-joined", loggedInUser._id);
  }, [loggedInUser._id]);
  useEffect(() => {
    socket.on("init", (data) => {
      setMessages(data);
    }); 
    
    socket.on("message", (data) => {
      // if(data.receiver_id === loggedInUser._id)
      setMessages((prevMessages) => [data, ...prevMessages]);
    });
  }, []);
  useEffect(() => {
    socket.emit("previous-msg-id", {
      receiver_id: reciever.user_id,
      sender_id: loggedInUser._id,
    });
  }, [reciever.user_id]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      socket.emit("message", {
        receiver_id: reciever.user_id,
        message: input,
        sender_id: loggedInUser._id,
      });
      // setMessages((messages) => [...messages, { message: input, sender: "self" }]);
      setInput("");
    }
  };

  return (
    <>
      <div style={{ display: showChat ? "block" : "none" }}>
        <div
          style={{ height: chatboxToggle ? "35rem" : "3.5rem" }}
          className="chat-container"
        >
          <div className="chat-heading">
            <h5>
              {reciever.name}
              <i
                className="fa fa-circle text-success"
                style={{ fontSize: "10px", position: "fixed" }}
              />
            </h5>
            <h5>
              <i
                style={{ marginRight: "6px" }}
                onClick={() =>
                  dispatch(chatboxAction(chatboxToggle ? false : true))
                }
                className="fa fa-minus text-light"
              />
              <i
                onClick={() => dispatch(chatboxToggleAction(false))}
                className="fa fa-times text-light"
              />
            </h5>
          </div>
          <div className="chat-list">
            {messages.map((msg, index) => (
              <div
                className={`${
                  msg.sender_id === loggedInUser._id
                    ? "chat mine"
                    : "chat theirs"
                }`}
                key={index}
              >
                {msg.message}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage}>
            <input
              id="chatInput"
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default TextArea;
