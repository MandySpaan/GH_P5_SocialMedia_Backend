import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  createPost,
  deletePostById,
  deletePostByIdAdmin,
  getAllPosts,
  getFollowingPosts,
  getOwnPosts,
  getPostById,
  getPostsByUserId,
  likePostById,
  updatePostById,
} from "./posts.controller.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";

const router = Router();

router.post("/", auth, createPost);
router.delete("/admin/:id", auth, isSuperAdmin, deletePostByIdAdmin);
router.delete("/:id", auth, deletePostById);
router.put("/like/:id", auth, likePostById);
router.put("/:id", auth, updatePostById);
router.get("/own", auth, getOwnPosts);
router.get("/", getAllPosts);
router.get("/user/:id", getPostsByUserId);
router.get("/following", auth, getFollowingPosts);
router.get("/:id", getPostById);

export { router };
