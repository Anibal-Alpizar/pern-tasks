import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();
  return (
    <div>
      <code>{JSON.stringify(user)}</code>
    </div>
  );
}

export default ProfilePage;
