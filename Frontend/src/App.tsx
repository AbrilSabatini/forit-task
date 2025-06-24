import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Error404 from "./components/Error404";
import { TaskForm } from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
import TaskService from "./services/TaskService";
import { type TaskArray, type TaskFormData } from "./types";


function App() {
  const [tasks, setTasks] = useState<TaskArray>([]);
  const taskService = new TaskService();

  useEffect(() => {
    taskService.getAll().then(setTasks)
    .catch(error => console.error("Error loading tasks:", error));
  }, []);

  const handleRemoveTask = async (id: number) => {
    await taskService.delete(id);
    setTasks(tasks.filter(task => task.id !== id))
    toast("Tarea eliminada", {icon: "🗑️"});
  };

  const handleCompleteTask = async (id: number) => {
  
    const updated = await taskService.update(id, { completed: !tasks.find(task => task.id === id)?.completed });
    setTasks(prec => prec.map(task => task.id === id ? updated : task))
    toast.success("Tarea completada");
  };

  const handleAddTask = async (task: TaskFormData) => {
    const newTask = await taskService.create(task)
  setTasks( prev => [...prev, newTask])
  };

  const handleEditTask = async (updatedTask: TaskFormData, id?: number) => {
    if(!id) return
    const updated = await taskService.update(id, updatedTask)
    setTasks(prev =>
      prev.map(task => task.id === updated.id ? updated : task)
    );
  };


  return (
    <BrowserRouter>
      <header className="p-4 bg-gray-100 flex justify-center">
        <h2>AppTasks</h2>
      </header>

      <Toaster
        position="bottom-left"
        toastOptions={{
          className: "text-sm rounded-lg px-4 py-2",
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: "#f5f0f0",
            color: "#333",
          },
        }}
      />
      <Link to="/tasks/form" className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 size-12 sm:size-16 bg-green-500 flex items-center justify-center rounded-full hover:scale-110 transition-transform text-white font-bold text-3xl sm:text-5xl shadow-lg">
        +
      </Link>
      
      <main className="p-4">
        <Routes>
          <Route
            path="/"
            element={<TaskList tasks={tasks} onRemoveTask={handleRemoveTask} onToggleComplete={handleCompleteTask} />}
          />
          <Route
            path="/tasks/edit/:id"
            element={<TaskForm tasks={tasks} onSubmit={handleEditTask} />}
          />
          <Route
            path="/tasks/form"
            element={<TaskForm tasks={tasks} onSubmit={handleAddTask} />}
          />

          <Route
            path="/tasks/:id"
            element={<TaskItem tasks={tasks} onRemoveTask={handleRemoveTask} />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
