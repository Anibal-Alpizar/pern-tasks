import { useAuth } from "../context/AuthContext";
import { Card } from "../components/ui";

function HomePage() {
  const data = useAuth();
  console.log(data);
  return (
    <div>
      <Card>
        <h1 className="text-3xl my-4">Home Page</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          aspernatur neque delectus vitae. Modi obcaecati quasi ullam,
          dignissimos quidem officiis sunt molestiae, illum voluptatum beatae
          eum maxime nobis hic voluptates omnis ad aliquam distinctio ipsam
          saepe corrupti. Eum, veritatis assumenda!
        </p>
      </Card>
    </div>
  );
}

export default HomePage;
