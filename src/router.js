import { Router } from "express";
import { router as userRoutes } from "./database/entities/users/users.routes.js";
import { router as authRoutes } from "./database/entities/auth/auth.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

console.log();

export { router };
