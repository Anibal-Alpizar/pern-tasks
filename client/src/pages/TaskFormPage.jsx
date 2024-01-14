import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [postErrors, setPostErrors] = useState([]);
  const { createTask } = useTasks();

  const onSubmit = handleSubmit(async (data) => {
    const res = await createTask(data);
    if (res) navigate("/");
  });

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {postErrors.map((error, i) => (
          <p className="text-red-500" key={i}>
            {error}
          </p>
        ))}
        <form onSubmit={onSubmit}>
          <h2 className="text-3xl font-black my-4">Create Task</h2>
          <Label htmlFor="title">Task Name</Label>
          <Input
            type="text"
            placeholder="Task Name"
            autoFocus
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500">This field is required</span>
          )}
          <Label htmlFor="description">Task Description</Label>
          <Textarea
            placeholder="Task Description"
            rows={3}
            {...register("description")}
          ></Textarea>
          <Button>Create Task</Button>
        </form>
      </Card>
    </div>
  );
}

export default TaskFormPage;
