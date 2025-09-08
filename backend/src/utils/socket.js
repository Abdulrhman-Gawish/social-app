const { Server } = require("socket.io");
const Message = require("../models/Message.js");
const Conversation = require("../models/Conversation.js");

let io;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);


        socket.on("joinConversation", (conversationId) => {
            socket.join(conversationId);
            console.log(`User ${socket.id} joined conversation ${conversationId}`);
        });

        socket.on("sendMessage", async({ conversationId, senderId, text }) => {
            const message = new Message({
                conversationId,
                senderId,
                text,
                createdAt: new Date(),
            });
            await message.save();

            await Conversation.findByIdAndUpdate(conversationId, {
                lastMessageId: message._id,
                updatedAt: new Date(),
            });

            
            io.to(conversationId).emit("receiveMessage", message);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}

function getIo() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = { initSocket, getIo };