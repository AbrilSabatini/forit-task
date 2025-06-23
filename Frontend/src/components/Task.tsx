import { Link } from "react-router-dom";
import { type Task as TaskType } from "../types";

type Props = {
  task: TaskType;
  onRemoveTask: (id: number) => void;
  onToggleComplete: (id: number) => void;
};

export const Task: React.FC<Props> = ({ task, onRemoveTask, onToggleComplete }) => {
  return (
    <div className={`task p-4 rounded shadow ${task.completed ? "bg-green-100" : "bg-white"}`}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <h2 className="font-semibold">{task.title}</h2>
      </div>

      <p className="truncate w-full max-w-md">{task.description}</p>

      <div className="mt-2 flex gap-2">
        <Link
          to={`/tasks/${task.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          Ver más
        </Link>
        <button
          className="text-red-500 text-sm"
          onClick={() => onRemoveTask(task.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};