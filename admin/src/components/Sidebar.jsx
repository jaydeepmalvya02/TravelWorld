import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { AgentContext } from "../context/AgentContext";

import { MdDashboardCustomize, MdOutlineDashboardCustomize } from 'react-icons/md'
import { CgBookmark, CgProfile} from 'react-icons/cg'
import { FaAngellist, FaList, FaMapMarkedAlt, FaSuitcaseRolling } from "react-icons/fa";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(AgentContext);
  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex gap-3 items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <MdOutlineDashboardCustomize />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex gap-3 items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/admin-tour-list"}
          >
            <FaSuitcaseRolling />
            <p className="hidden md:block">Tours</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex gap-3 items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/admin-agent-list"}
          >
            <FaList />
            <p className="hidden md:block">Agent List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex gap-3 items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/agent-dashboard"}
          >
           <MdDashboardCustomize/>
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex gap-3 items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/agent-packages"}
          >
            <FaSuitcaseRolling />
            <p className="hidden md:block">Packages</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex gap-3 items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/agent-profile"}
          >
            <CgProfile/>
            <p className="hidden md:block">Profile</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex gap-3 items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/agent-bookings"}
          >
            <CgBookmark/>
            <p className="hidden md:block">Boookings</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
