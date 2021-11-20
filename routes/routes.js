import express from "express";
import {
  getAllDiscussions,
  getDiscussionById,
  createDiscussion,
  addReply,
  getReplies,
} from "../controllers/discussions.js";
import { signIn, signUp } from "../controllers/users.js";

const router = express.Router();

// Discussions urls

router.post("/discussions/create-discussion", createDiscussion);
router.post("/discussions/add-reply", addReply);
router.get("/discussions/get-discussions", getAllDiscussions);
router.get("/discussions/get-discussion", getDiscussionById);
router.get("/discussions/get-replies", getReplies);

// Auth urls

router.post("/users/sign-in", signIn);
router.post("/users/sign-up", signUp);

export default router;
