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
    <div className="p-4">
      <h2 className="text-2xl font-bold">{task.title}</h2>
      <p className="text-gray-700 mt-2">{task.description}</p>
      <p className="text-sm text-gray-500 mt-1">
        Creada el {new Date(task.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:underline"
        >
          Eliminar
        </button>
        <Link to={`/tasks/edit/${task.id}`} className="text-blue-600 hover:underline">
          Editar
        </Link>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
