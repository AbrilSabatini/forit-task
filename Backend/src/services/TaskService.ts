import { CreateTaskDto } from "../interfaces/CreateTaskDto";
import { Task } from "../interfaces/Task";

export default class TaskService {
  private tasks: Task[] = [];
  private currentId = 1;

  constructor() {
    if (process.env.SEED_DATA === "true") {
      this.tasks = [
        {
          id: this.currentId++,
          title: "Aprender TypeScript",
          description: "Estudiar los conceptos básicos y tipos.",
          completed: false,
          createdAt: new Date(),
        },
        {
          id: this.currentId++,
          title: "Practicar Express",
          description: "Hacer rutas y middlewares.",
          completed: true,
          createdAt: new Date(),
        },
      ];
    }
  }

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
