import { Button, Card, Container, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const { signup, errors: signupErrros } = useAuth();
  const navigate = useNavigate();

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
    const user = await signup(data);
    if (user) navigate("/profile");
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {signupErrros &&
          signupErrros.map((err, i) => (
            <p key={i} className="text-red-500 text-center">
              {err}
            </p>
          ))}
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
    </Container>
  );
}

export default RegisterPage;
