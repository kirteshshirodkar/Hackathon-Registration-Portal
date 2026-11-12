
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] p-10 text-white">
      <h1 className="text-3xl font-bold">
        Welcome, {user?.fullName || user?.name || "User"}!
      </h1>

      <p className="mt-2 text-gray-400">
        {user?.email}
      </p>

      <button
        onClick={handleLogout}
        className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-medium hover:bg-violet-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
