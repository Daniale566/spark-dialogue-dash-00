import Header from "@/components/Header";
import Dashboard from "./Dashboard";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <Dashboard />
    </div>
  );
};

export default DashboardLayout;