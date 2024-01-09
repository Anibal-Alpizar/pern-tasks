import { Button, Card, Input } from "../components/ui";

function RegisterPage() {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold">Register</h3>
        <form>
          <Input placeholder="Enter your full name" />
          <Input type="email" placeholder="Enter your email" />
          <Input type="password" placeholder="Enter your password" />
          <Button>Register</Button>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
