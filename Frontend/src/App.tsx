import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Error404 from "./components/Error404";
import { TaskForm } from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
import { type Task } from "./types";

const mockTasks = [
  { id: 1, title: 'Learn React', description: 'Study the React docs', completed: false, createdAt: new Date() },
  { id: 2, title: 'Build a Todo App', description: 'Create a simple app', completed: false, createdAt: new Date() },
  { id: 3, title: 'Deploy the App', description: 'Deploy it somewhere', completed: true, createdAt: new Date() }
];

function App() {
  const [tasks, setTasks] = useState(mockTasks);

  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  };

  const handleCompleteTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (task: Task) => {
  setTasks( prev => [...prev, task])
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };


  return (
    <BrowserRouter>
     <header className="p-4 bg-gray-100">
        <Link to="/tasks/form" className="btn btn-primary">
          Nueva tarea
        </Link>
      </header>
      
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
