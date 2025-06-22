import { Router, Request, Response } from "express";
import TaskController from "../controllers/TaskController";
import { validateBodyTask } from "../validators/task.validator";

const router = Router();
const taskController = new TaskController();

router.get("/tasks", (req: Request, res: Response) => {
  taskController.getAll(req, res);
});

router.get("/tasks/:id", (req: Request, res: Response) => {
  taskController.getById(req, res);
});

router.post("/tasks", validateBodyTask(), (req: Request, res: Response) => {
  taskController.create(req, res);
});

router.put(
  "/tasks/:id",
  validateBodyTask(true),
  (req: Request, res: Response) => {
    taskController.update(req, res);
  }
);

router.delete("/tasks/:id", (req: Request, res: Response) => {
  taskController.delete(req, res);
});

export default router;
