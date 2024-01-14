import { Card, Button } from "../ui";
import { deleteTaskRequest } from "../../api/tasks.api";

function TaskCard({ task }) {
  return (
    <Card key={task.id} className="px-7 py-4">
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p>{task.description}</p>
      </div>
      <div className="my-2 flex justify-end gap-x-2">
        <Button>Editar</Button>
        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={async () => {
            if (confirm("Are you sure?")) await deleteTaskRequest(task.id);
          }}
        >
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

export default TaskCard;
