import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  createPost,
  deletePostById,
  updatePostById,
} from "./posts.controller.js";

const router = Router();

router.post("/", auth, createPost);
router.delete("/:id", auth, deletePostById);
router.put("/:id", auth, updatePostById);

export { router };
