import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type { TaskArray, TaskFormData } from "../types";



type Props = {
  tasks: TaskArray
  onSubmit: (data: TaskFormData, id?: number) => Promise<void>
};


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
        await onSubmit(data, taskToEdit.id)
      } else {
        await onSubmit(data)
      }
      navigate("/");
    } catch (error) {
      alert("Error al guardar tarea")
      console.error(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 bg-gray-50">
      <form onSubmit={handleSubmit(handleSubmitForm)} className="p-4 space-y-4 max-w-md w-full bg-white rounded shadow">
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
          <textarea
            className="block w-full border p-2 rounded"
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

        <div className="flex justify-end gap-2">
          <button type="submit" className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded">
            {editar ? "Actualizar" : "Agregar"} tarea
          </button>
          <button
            type="button"
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => editar && taskToEdit ? navigate(`/tasks/${taskToEdit.id}`) : navigate("/")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

