import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { AgentContext } from "../context/AgentContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AgentRegisterModal from "../modal/AgentRegisterModal"; // ✅ Import your modal

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAgentRegister, setShowAgentRegister] = useState(false); // ✅ Modal toggle

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(AgentContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          navigate("/admin-dashboard");
          toast.success("Login Successful");
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/agent/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          navigate("/agent-dashboard");
          toast.success("Login Successful");
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="min-h-[80vh] flex justify-center items-center "
      >
        <div className="flex flex-col m-auto gap-5 p-8 items-start min-w-[360px] sm:min-w-96 border border-blue-800 rounded-lg shadow-lg text-sm text-[#5E5E5E] ">
          <p className="m-auto text-2xl font-serif ">
            <span className="text-purple-600">{state}</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              placeholder="Enter Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              placeholder="Enter Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="bg-blue-600 rounded-xl w-full text-white py-2 text-base">
            Login
          </button>

          {state === "Admin" ? (
            <p>
              Agent Login?{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => setState("Agent")}
              >
                Click here
              </span>
            </p>
          ) : (
            <>
              <p>
                Admin Login?{" "}
                <span
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => setState("Admin")}
                >
                  Click here
                </span>
              </p>
              <p>
                Want to register as an Agent?{" "}
                <span
                  className="text-green-600 underline cursor-pointer"
                  onClick={() => setShowAgentRegister(true)}
                >
                  Register here
                </span>
              </p>
            </>
          )}
        </div>
      </form>

      {/* ✅ Agent Register Modal */}
      <AgentRegisterModal
        show={showAgentRegister}
        onClose={() => setShowAgentRegister(false)}
        onSuccess={() => {
          toast.success("Agent Registered Successfully! Please login.");
          setShowAgentRegister(false);
        }}
      />
    </div>
  );
};

export default Login;
