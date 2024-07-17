import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";
import { getAllUsers, getUserProfile } from "./users.controller.js";

const router = Router();

router.get("/", auth, isSuperAdmin, getAllUsers);
router.get("/profile", auth, getUserProfile);

export { router };
