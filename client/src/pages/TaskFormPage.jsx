import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [postErrors, setPostErrors] = useState([]);
  const { createTask, loadTask, error: taskErrors, updateTask } = useTasks();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    let task;
    if (!params.id) task = await createTask(data);
    else task = await updateTask(params.id, data);
    if (task) navigate("/");
  });

  useEffect(() => {
    if (params.id)
      loadTask(params.id).then((task) => {
        setValue("title", task.title);
        setValue("description", task.description);
      });
  }, []);
  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {taskErrors.map((error, i) => (
          <p className="text-red-500" key={i}>
            {error}
          </p>
        ))}
        {postErrors.map((error, i) => (
          <p className="text-red-500" key={i}>
            {error}
          </p>
        ))}
        <form onSubmit={onSubmit}>
          <h2 className="text-3xl font-black my-4">
            {params.id ? `Edit Task` : `Create Task`}
          </h2>
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
          <Button>{params.id ? `Edit Task` : `Create Task`}</Button>
        </form>
      </Card>
    </div>
  );
}

export default TaskFormPage;
