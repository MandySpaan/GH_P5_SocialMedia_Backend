import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  createPost,
  deletePostById,
  getALLPosts,
  getOwnPosts,
  getPostById,
  getPostsByUserId,
  likePostById,
  updatePostById,
} from "./posts.controller.js";

const router = Router();

router.post("/", auth, createPost);
router.delete("/:id", auth, deletePostById);
router.put("/:id", auth, updatePostById);
router.get("/own", auth, getOwnPosts);
router.get("/", getALLPosts);
router.get("/user/:id", getPostsByUserId);
router.get("/:id", getPostById);
router.put("/like/:id", likePostById);

export { router };
