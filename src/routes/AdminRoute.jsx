import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const AdminRoute = ({ children }) => {
  const user = getUserFromToken();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "ADMIN") return <Navigate to="/institution" />;

  return children;
};

export default AdminRoute;
