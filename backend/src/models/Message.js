import mongoose from "mongoose";

const { Schema } = mongoose;

const mediaSchema = new Schema(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
    width: { type: Number },
    height: { type: Number },
  },
  { _id: false } 

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    text: {
      type: String,
      maxlength: 4000,
    },
    media: [mediaSchema],
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

messageSchema.index({ createdAt: 1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;