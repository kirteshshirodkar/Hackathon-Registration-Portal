
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../common/DashboardNavbar";
import DashboardFooter from "../common/DashboardFooter";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#050816] text-white">

      <DashboardNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <DashboardFooter />

    </div>
  );
};

export default DashboardLayout;
