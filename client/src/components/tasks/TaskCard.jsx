import { Card } from "../ui";

function TaskCard({ task }) {
  return (
    <Card key={task.id}>
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p>{task.description}</p>
    </Card>
  );
}

export default TaskCard;
