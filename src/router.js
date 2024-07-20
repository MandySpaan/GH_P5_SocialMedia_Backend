import { Router } from "express";
import { router as authRoutes } from "./database/entities/auth/auth.routes.js";
import { router as userRoutes } from "./database/entities/users/users.routes.js";
import { router as postRoutes } from "./database/entities/posts/posts.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

export { router };
