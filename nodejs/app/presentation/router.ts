import express from "express";
import { todoController } from "./controller/todo/todo_controller.js";

export const router = express();
router.use(express.json());

router.use("/api/v1/todo", todoController);
