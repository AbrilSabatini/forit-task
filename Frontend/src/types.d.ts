export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export type TaskArray = Task[];

export type TaskFormData = Omit<Task, "id" | "createdAt">;
