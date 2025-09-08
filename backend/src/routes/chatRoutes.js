const express = require("express");
const {
    getConversations,
    createConversation,
    sendMessage,
} = require("../controllers/chat.cntroller.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.use(authMiddleware);

router.get("/conversations", getConversations);
router.post("/conversations", createConversation);
router.post("/conversations/:id/messages", sendMessage);

module.exports = router;