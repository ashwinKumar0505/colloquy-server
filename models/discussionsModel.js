import mongoose from "mongoose";

const DiscussionSchema = mongoose.Schema({
  creatorName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: String, required: true },
  replies: [
    {
      personName: String,
      reply: String,
    },
  ],
});

export const DiscussionModel = mongoose.model("discussion", DiscussionSchema);
