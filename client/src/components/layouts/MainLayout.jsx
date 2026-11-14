
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer"

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />

      <main className="min-h-screen pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
