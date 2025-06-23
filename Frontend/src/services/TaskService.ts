import type { Task, TaskArray } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export default class TaskService {
  async getAll(): Promise<TaskArray> {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error("Error al obtener tareas");
    return await response.json();
  }

  async getById(id: number): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`);
    if (response.status === 404) throw new Error("Tarea no encontrada");
    if (!response.ok) throw new Error("Error al obtener la tarea");
    return await response.json();
  }

  async create(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Error al crear la tarea");
    return await response.json();
  }

  async update(id: number, task: Omit<Task, "createdAt">): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Error al actualizar la tarea");
    return await response.json();
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar la tarea");
  }
}
