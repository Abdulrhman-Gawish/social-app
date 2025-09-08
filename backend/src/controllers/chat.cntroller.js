const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");

const getConversations = async(req, res) => {
    try {
        const userId = req.user.id; 
        const conversations = await Conversation.find({
                participantIds: userId,
            })
            .populate("lastMessageId")
            .sort({ updatedAt: -1 });

        res.json(conversations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createConversation = async(req, res) => {
    try {
        const { participantIds } = req.body;

        const conversation = new Conversation({
            participantIds,
        });

        await conversation.save();
        res.status(201).json(conversation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const sendMessage = async(req, res) => {
    try {
        const { id } = req.params; 
        const { text, senderId } = req.body;

        const message = new Message({
            conversationId: id,
            senderId,
            text,
            createdAt: new Date(),
        });

        await message.save();

       
        await Conversation.findByIdAndUpdate(id, {
            lastMessageId: message._id,
            updatedAt: new Date(),
        });

        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getConversations, createConversation, sendMessage };