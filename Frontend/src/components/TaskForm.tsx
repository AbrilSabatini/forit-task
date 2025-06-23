import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import TaskService from "../services/TaskService";
import type { Task, TaskArray } from "../types";

type TaskFormData = Omit<Task, "id" | "createdAt">;

type Props = {
  tasks: TaskArray
  onSubmit: () => void
};

const taskService = new TaskService();

export const TaskForm: React.FC<Props> = ({ tasks, onSubmit }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const editar = Boolean(id);
  const taskToEdit = editar ? tasks.find(task => task.id === Number(id)) : null

  const { register, handleSubmit, formState: { errors },} = useForm<TaskFormData>({
    defaultValues: taskToEdit ?? { title: "", description: "", completed: false },
  });

  const handleSubmitForm = async (data: TaskFormData) => {
    try {
      if (editar && taskToEdit) {
        await taskService.update(taskToEdit.id, {...data, id: taskToEdit.id});
      } else {
        await taskService.create(data);
      }
      onSubmit()
      navigate("/")
    } catch (error) {
      alert("Error al guardar tarea");
      console.error(error);
    }
  };

  return (
     <form onSubmit={handleSubmit(handleSubmitForm)} className="p-4 space-y-4 max-w-md mx-auto">
      <div>
        <label className="block font-semibold mb-1">Título</label>
        <input
          className="block w-full border p-2 rounded"
          type="text"
          {...register("title", { required: true, minLength: 3, maxLength: 20 })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">
            {errors.title.type === "required" && "Ingresa un título"}
            {errors.title.type === "minLength" && "Mínimo 3 caracteres"}
            {errors.title.type === "maxLength" && "Máximo 20 caracteres"}
          </p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1">Descripción</label>
        <input
          className="block w-full border p-2 rounded"
          type="text"
          {...register("description", { required: true, minLength: 3, maxLength: 100 })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">
            {errors.description.type === "required" && "Ingresa una descripción"}
            {errors.description.type === "minLength" && "Mínimo 3 caracteres"}
            {errors.description.type === "maxLength" && "Máximo 100 caracteres"}
          </p>
        )}
      </div>

      <div>
        <label className="inline-flex items-center">
          <input type="checkbox" className="mr-2" {...register("completed")} />
          Completado
        </label>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editar ? "Actualizar" : "Agregar"} tarea
        </button>
        <button
          type="button"
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => navigate("/")}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

