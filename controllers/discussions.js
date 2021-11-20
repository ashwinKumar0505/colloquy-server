import { DiscussionModel } from "../models/discussionsModel.js";
import findDate from "../utils/findDate.js";

export const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await DiscussionModel.find({});

    // Reversing the array to show the latest discussions on top
    res.status(200).send(discussions.reverse());
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getDiscussionById = async (req, res) => {
  const { discussionId } = req.query;

  try {
    const selectedDiscussion = await DiscussionModel.findById(discussionId);
    res.status(200).send(selectedDiscussion);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getReplies = async (req, res) => {
  const { discussionId } = req.query;

  try {
    const selectedDiscussion = await DiscussionModel.findById(discussionId);
    res.status(200).send(selectedDiscussion.replies);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const createDiscussion = async (req, res) => {
  const { creatorName, title, description, userId } = req.body;

  if (!userId) res.status(400).json({ message: "UnAuthorized." });

  const createdAt = findDate();

  const newDiscussion = new DiscussionModel({
    creatorName,
    title,
    description,
    createdAt,
    userId,
    replies: [],
  });

  try {
    await newDiscussion.save();
    res.status(201).json(newDiscussion);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const addReply = async (req, res) => {
  const { discussionId, personName, reply } = req.body;

  try {
    const currentDiscussion = await DiscussionModel.findById(discussionId);
    const updatedDiscussions = await DiscussionModel.findByIdAndUpdate(
      discussionId,
      {
        replies: [
          {
            personName,
            reply,
          },
          ...currentDiscussion.replies,
        ],
      }
    );
    res.status(201).json(updatedDiscussions);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
