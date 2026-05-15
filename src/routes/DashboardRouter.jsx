import PublicDashboard from "../pages/public/PublicDashboard";
import InstitutionDashboard from "../pages/Institution/pages/InstitutionDashboard";
import { isAuthenticated } from "../utils/auth";

const DashboardRouter = () => {
  return isAuthenticated() 
  ? (<InstitutionDashboard />) 
  : (<PublicDashboard />);
};

export default DashboardRouter;
