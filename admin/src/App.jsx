import { useContext } from "react";
import "./index.css";
import { AdminContext } from "./context/AdminContext";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Dashboard from "./pages/Admin/Dashboard";
import TourList from "./pages/Admin/TourList";
import AgentDashboard from "./pages/Agent/AgentDashboard";
import Profile from "./pages/Agent/Profile";
import AgentPackages from "./pages/Agent/AgentPackages";
import AgentList from "./pages/Admin/AgentList";
import { AgentContext } from "./context/AgentContext";
import AgentBookings from "./pages/Agent/AgentBookings";

function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(AgentContext);

  return aToken || dToken ? (
    <div className="bg-[#F8F9DC]">
      <ToastContainer />
      <Navbar />

      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" index element={<Home />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/admin-tour-list" element={<TourList />} />
          <Route path="/admin-agent-list" element={<AgentList />} />
          {/* Agent Routes */}
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/agent-profile" element={<Profile />} />
          <Route path="/agent-packages" element={<AgentPackages />} />
          <Route path="/agent-bookings" element={<AgentBookings />} />

          {/* <Route path='/'/> */}
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
