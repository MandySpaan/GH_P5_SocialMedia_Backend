import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";
import {
  deleteUserByIdAdmin,
  followUserById,
  getAllUsers,
  getOwnProfile,
  getUserProfileById,
  updateUser,
} from "./users.controller.js";

const router = Router();

router.get("/", auth, isSuperAdmin, getAllUsers);
router.delete("/:id", auth, isSuperAdmin, deleteUserByIdAdmin);
router.get("/profile", auth, getOwnProfile);
router.get("/profile/:id", getUserProfileById);
router.put("/profile", auth, updateUser);
router.put("/follow/:id", auth, followUserById);

export { router };
