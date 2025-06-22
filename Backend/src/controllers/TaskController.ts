import TaskService from "../services/TaskService";
import { Request, Response } from "express";

const taskService = new TaskService();

export default class TaskController {
  getAll(_req: Request, res: Response) {
    const tasks = taskService.getAll();
    res.status(200).json(tasks);
  }

  getById(req: Request, res: Response) {
    const { id } = req.params;
    const taskId = parseInt(id, 10);
    const task = taskService.getById(taskId);

    if (!task) {
      res.status(404).json({ error: `Task with id ${taskId} not found` });
      return;
    }

    res.status(200).json(task);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const taskId = parseInt(id, 10);
    const requestBody = req.body;
    const updatedTask = taskService.update(taskId, requestBody);

    if (!updatedTask) {
      res.status(404).json({ error: `Task with id ${taskId} not found` });
      return;
    }

    res.status(200).json(updatedTask);
  }

  create(req: Request, res: Response) {
    const requestBody = req.body;
    const newTask = taskService.create(requestBody);
    res.status(201).json(newTask);
  }

  delete(req: Request, res: Response) {
    const { id } = req.params;
    const taskId = parseInt(id, 10);
    const deleted = taskService.delete(taskId);

    if (!deleted) {
      res.status(404).json({ error: `Task with id ${taskId} not found` });
      return;
    }

    res.status(204).send();
  }
}
