import PublicDashboard from "../pages/public/PublicDashboard";
import InstitutionDashboard from "../pages/Institution/InstitutionDashboard";
import { isAuthenticated } from "../utils/auth";

const DashboardRouter = () => {
  return isAuthenticated() 
  ? (<PublicDashboard />) 
  : (<PublicDashboard />);
};

export default DashboardRouter;
