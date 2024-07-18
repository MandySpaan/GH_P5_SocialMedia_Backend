import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  createPost,
  deletePostById,
  getALLPosts,
  getOwnPosts,
  updatePostById,
} from "./posts.controller.js";

const router = Router();

router.post("/", auth, createPost);
router.delete("/:id", auth, deletePostById);
router.put("/:id", auth, updatePostById);
router.get("/own", auth, getOwnPosts);
router.get("/", getALLPosts);

export { router };
