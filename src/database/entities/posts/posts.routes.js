import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { createPost, deletePostById } from "./posts.controller.js";

const router = Router();

router.post("/", auth, createPost);
router.delete("/:id", deletePostById);

export { router };
