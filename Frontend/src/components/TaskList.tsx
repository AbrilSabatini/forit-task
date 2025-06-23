import { type TaskArray } from "../types";
import { Task } from "./Task";

type Props = {
  tasks: TaskArray
  onRemoveTask: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

export const TaskList: React.FC<Props> = ({ tasks, onRemoveTask, onToggleComplete }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <Task key={task.id} task={task} onRemoveTask={onRemoveTask} onToggleComplete={onToggleComplete} />
      )) }
    </section>
  )
};

export default TaskList;