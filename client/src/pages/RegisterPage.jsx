import { Button, Card, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /*
  register = onChange, name, value
  */

  const onSubmit = handleSubmit(async (data) => {
    // data is what it has in the inputs (name, email, password)
    const res = await axios.post("http://localhost:3000/api/signup", data, {
      withCredentials: true,
    });
    console.log(res);
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold">Register</h3>
        <form onSubmit={onSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          <Label htmlFor="password">Password</Label>
          {errors.email && <p className="text-red-500">Email is required</p>}
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <Button>Register</Button>
          <div className="flex justify-between my-4">
            <p>Already have an account? </p>
            <Link to="/login" className="font-bold">
              Sign in
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
