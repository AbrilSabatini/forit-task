import { type TaskArray } from "../types";
import { Task } from "./Task";

type Props = {
  tasks: TaskArray
  onRemoveTask: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

export const TaskList: React.FC<Props> = ({ tasks, onRemoveTask, onToggleComplete }) => {
  return (
    <section className="task-section">
      {tasks.map(task => (
        <Task key={task.id} task={task} onRemoveTask={onRemoveTask} onToggleComplete={onToggleComplete} />
      )) }
    </section>
  )
};

export default TaskList;