import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AgentList = () => {
  const { backendUrl, aToken } = useContext(AdminContext);
  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/admin/all-agents`, {
        headers: { atoken: aToken },
      });
      if (data.success) {
        setAgents(data.agents);
        console.log(data.agents);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch agents");
    }
  };

  const handleDelete = async (agentId) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    try {
      const { data } = await axios.delete(
        `${backendUrl}/admin/delete-agent/${agentId}`,
        {
          headers: { atoken: aToken },
        }
      );
      if (data.success) {
        toast.success("Agent deleted");
        fetchAgents(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete agent");
    }
  };

  const handleVerify = async (agentId) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/admin/agent/verify/${agentId}`,
        {},
        {
          headers: { atoken: aToken },
        }
      );
      if (data.success) {
        toast.success("Agent verified");
        fetchAgents(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to verify agent");
    }
  };

  useEffect(() => {
    if (aToken) fetchAgents();
  }, [aToken]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Agent List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Company</th>
              <th className="py-2 px-4 border-b">Region</th>
              <th className="py-2 px-4 border-b">Verified</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.length > 0 ? (
              agents.map((agent) => (
                <tr key={agent._id} className="border-b">
                  <td className="py-2 px-4">{agent.name}</td>
                  <td className="py-2 px-4">{agent.email}</td>
                  <td className="py-2 px-4">{agent.phone}</td>
                  <td className="py-2 px-4">{agent.companyName}</td>
                  <td className="py-2 px-4">{agent.region}</td>
                  <td className="py-2 px-4">
                    {agent.status==='active' ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    {!agent.verified && (
                      <button
                        onClick={() => handleVerify(agent._id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Verify
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(agent._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-4 px-4 text-center" colSpan="7">
                  No agents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentList;
