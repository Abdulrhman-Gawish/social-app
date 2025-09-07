import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participantIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
    ],
    lastMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      index: true,
    },
  },
  { timestamps: true } 
);


const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;