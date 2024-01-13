import { useEffect, useState } from "react";
import { getTasksRequest } from "../api/tasks.api";
import TaskCard from "../components/tasks/TaskCard";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasksRequest().then((res) => setTasks(res.data));
  }, []);
  return (
    <div className="grid grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskPage;
