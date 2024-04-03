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
