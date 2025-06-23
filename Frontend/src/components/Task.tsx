import { Link } from "react-router-dom";
import { type Task as TaskType } from "../types";

type Props = {
  task: TaskType;
  onRemoveTask: (id: number) => void;
  onToggleComplete: (id: number) => void;
};

export const Task: React.FC<Props> = ({ task, onRemoveTask, onToggleComplete }) => {
  return (
    <section className={`p-4 rounded shadow ${task.completed ? "bg-green-100" : "bg-white"} transition-transform`}>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="w-5 h-5 accent-green-500 rounded transition-transform cursor-pointer hover:scale-105"
        />
      </div>

      <div className=" flex flex-col justify-center items-center text-center" >
        <h2 className="sm:text-3xl font-semibold">{task.title}</h2>
        <p className="truncate w-full overflow-hidden whitespace-nowrap">{task.description}</p>
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <button
          className="text-red-500 hover:underline text-sm cursor-pointer"
          onClick={() => onRemoveTask(task.id)}
        >
          Eliminar
        </button>
        <Link
          to={`/tasks/${task.id}`}
          className="text-blue-600 hover:underline text-sm cursor-pointer"
        >
          Ver más
        </Link>
      </div>
    </section>
  );
};