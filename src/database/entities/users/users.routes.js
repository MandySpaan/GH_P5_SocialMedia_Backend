import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";
import {
  getAllUsers,
  getOwnProfile,
  getUserProfileById,
  updateUser,
} from "./users.controller.js";

const router = Router();

router.get("/", auth, isSuperAdmin, getAllUsers);
router.get("/profile", auth, getOwnProfile);
router.get("/profile/:id", getUserProfileById);
router.put("/profile", auth, updateUser);

export { router };
