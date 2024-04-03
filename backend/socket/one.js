const { Server } = require("socket.io");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const { getContacts } = require("../controllers/social/contactsController");
const Contacts = require("../models/social/contactsModel");
function ChatSocket(server, app) {
  const io = socketIo(server);
  const users = [];
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
      transports: ["websocket", "polling"],
    })
  );

  const MessageSchema = new mongoose.Schema(
    {
      message: {
        type: Object,
      },
      sender_id: {
        type: Object,
        required: true,
      },
      receiver_id: {
        type: Object,
        required: true,
      },
      file_upload: {
        type: Object,
      },
      unread: {
        type: Object,
        default: "0",
      },
    },
    { timestamps: true }
  );

  const Message = mongoose.model("Message", MessageSchema);

  io.on("connection", (socket) => {
    socket.on("new-user-joined", (sender_id) => {
      console.log("user sender_id joined: ", sender_id);
      console.log("users: ", users);
      users[socket.id] = sender_id;
    });

    socket.on("message", async (data) => {
      const { receiver_id, sender_id, message } = data;
      // start here
      const findContact = await Contacts.find({
        user_id: receiver_id,
        created_by: sender_id,
      });
      if (findContact) {
        const newMessage = new Message({ sender_id, receiver_id, message });
        const messages = await newMessage.save();
        if (messages) {
          const sendMsg = await Message.find({ _id: messages.insertedId });
          if (sendMsg) {
            const recipientSocketId = Object.keys(users).find(
              (key) => users[key] === receiver_id
            );

            if (recipientSocketId) {
              console.log(
                `Recipient with ID ${recipientSocketId} and reciever id is: ${receiver_id}`
              );
              io.to(recipientSocketId).emit("message", {
                message,
                sender_id,
                receiver_id: users[socket.id],
                // unread: results[0].unread,
              });
            } else {
              console.log(
                `Recipient with ID ${recipientSocketId} not found. and reciever id is: ${receiver_id}`
              );
            }
          }
        }
      }
      // end here
      // Save the message to MongoDB
      // const newMessage = new Message({ sender_id, receiver_id, message });
      // await newMessage.save();

      // // Broadcast the message to all clients
      // io.emit("message", { sender_id, message });
    });

    socket.on("previous-msg-id", (previousData) => {
      Message.find({
        $or: [
          {
            $and: [
              { receiver_id: previousData.receiver_id },
              { sender_id: previousData.sender_id },
            ],
          },
          {
            $and: [
              { receiver_id: previousData.receiver_id },
              { sender_id: previousData.sender_id },
            ],
          },
          {
            $and: [
              { receiver_id: previousData.sender_id },
              { sender_id: previousData.receiver_id },
            ],
          },
          {
            $and: [
              { receiver_id: previousData.sender_id },
              { sender_id: previousData.receiver_id },
            ],
          },
        ],
      })
        .sort({ updatedAt: -1 })
        .then((messages) => {
          socket.emit("init", messages);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });

    socket.on("altbar-contactList", async (data) => {
      await getContacts(socket, data);
    });
    socket.on("disconnect", (message) => {
      console.log("users disconnected: ", users);
      // socket.broadcast.emit("left", users[socket.id]);
      delete users[socket.id];
    });
  });
}

module.exports = ChatSocket;










































import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { chatboxAction, chatboxToggleAction } from "../../redux/action";

const socket = io(`${process.env.REACT_APP_BASE_URL}`, {
  transports: ["websocket", "polling", "flashsocket"],
});

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
