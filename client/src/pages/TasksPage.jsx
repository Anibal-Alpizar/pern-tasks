import { useEffect } from "react";
import TaskCard from "../components/tasks/TaskCard";
import { useTasks } from "../context/TaskContext";

function TaskPage() {
  const { tasks, loadTasks } = useTasks();
  console.log(tasks);
  useEffect(() => {
    loadTasks();
  }, []);
  if (tasks.length === 0)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <p className="text-3xl font-bold">No tasks yet</p>
      </div>
    );

  return (
    <div className="grid grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskPage;
