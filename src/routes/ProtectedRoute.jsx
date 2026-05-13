import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const user = getUserFromToken();
  return user ? children : <Navigate to="/institution/courses" />;
};

export default ProtectedRoute;
