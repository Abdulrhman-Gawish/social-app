import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("auth/logout");
      alert("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
