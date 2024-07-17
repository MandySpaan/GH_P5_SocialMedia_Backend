import { Router } from "express";
import { register } from "./users.controller.js";

const router = Router();

router.post("/api/auth/register", register);

export { router };
