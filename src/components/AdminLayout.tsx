import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="md:ml-60 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-6 pt-16 md:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
