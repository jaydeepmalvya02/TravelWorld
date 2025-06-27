import React, { useContext, useEffect, useRef } from "react";

import { AdminContext } from "../context/AdminContext";

import { AgentContext } from "../context/AgentContext";
import Logo from '../assets/images/logo.png'
const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(AgentContext);
  const headerRef=useRef(null)

  const logout = () => {
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white gap-3">
      <div className="flex items-center gap-2 text-xs">
        <img className="w-36 sm:w-40 cursor-pointer" src={Logo} alt="Logo" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : dToken ? "Agent" : "Guest"}
        </p>
      </div>
      {(aToken || dToken) && (
        <button
          onClick={logout}
          className="bg-[#faa935] px-10 py-2 rounded-full text-white"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
