import { Card, Input, Button, Label } from "../components/ui";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <Card>
        <h1 className="text-4xl font-bold my-2 text-center">Sign in</h1>
        <form>
          <Label htmlFor="email">Email</Label>
          <Input placeholder="Enter your email" />
          <Label htmlFor="password">Password</Label>
          <Input placeholder="Enter your password" />
          <Button>Sign in</Button>
          <div className="flex justify-between my-4">
            <p>Dont have an account? </p>
            <Link to="/register" className="font-bold">
              Sign up
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
