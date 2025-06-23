import { Link, useNavigate, useParams } from "react-router-dom";
import { type Task } from "../types";

type Props = {
  tasks: Task[];
  onRemoveTask: (id: number) => void;
};

const TaskItem: React.FC<Props> = ({ tasks, onRemoveTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const taskId = Number(id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return <p className="text-red-600">Tarea no encontrada.</p>;
  }

  const handleDelete = () => {
    onRemoveTask(task.id);
    navigate("/");
  };

  return (
    <div className="relative bg-gray-50 px-4 pt-16 pb-8 min-h-[calc(100vh-64px)] flex items-center justify-center">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow transition cursor-pointer"
      >
        Volver
      </button>
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">{task.title}</h2>
        <p className="text-gray-700 mb-3 text-center text-balance">{task.description}</p>
        <p className="text-sm text-gray-500 text-center">
          Creada el {new Date(task.createdAt).toLocaleDateString()}
        </p>
        
        <p className={`text-center text-sm mt-2 font-semibold ${task.completed ? "text-green-600" : "text-yellow-600"}`}>
          {task.completed ? "Completada" : "Pendiente"}
        </p>

        <div className="mt-4 flex justify-end gap-3 flex-wrap">
          <button
            onClick={handleDelete}
            className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm transition cursor-pointer"
          >
            Eliminar
          </button>
          <Link to={`/tasks/edit/${task.id}`} className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm transition cursor-pointer">
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
