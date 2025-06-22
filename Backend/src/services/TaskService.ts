import { Task } from "../interfaces/Task";
import { CreateTaskDto } from "../interfaces/CreateTaskDto";

export default class TaskService {
  private tasks: Task[] = [];
  private currentId = 1;

  getAll(): Task[] {
    return this.tasks;
  }

  getById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: number, taskRequest: Task): Task | undefined {
    const task = this.getById(id);
    if (!task) return undefined;

    if (taskRequest.title !== undefined) task.title = taskRequest.title;
    if (taskRequest.description !== undefined)
      task.description = taskRequest.description;
    if (taskRequest.completed !== undefined)
      task.completed = taskRequest.completed;

    return task;
  }

  create(task: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.currentId++,
      createdAt: new Date(),
      ...task,
      completed: task.completed ?? false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  delete(id: number): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return false;
    }
    this.tasks.splice(taskIndex, 1);
    return true;
  }
}
