import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { AgentContext } from "../../context/AgentContext";

const Profile = () => {
  const [agentData, setAgentData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const { backendUrl } = useContext(AdminContext);
  const { dToken } = useContext(AgentContext);

  const fetchAgentData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/agent/profile`, {
        headers: { dtoken: dToken },
      });
      if (data.success) {
        setAgentData(data.agentData);
        setFormData(data.agentData); // for editing
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch agent data");
    }
  };

  useEffect(() => {
    if (dToken) fetchAgentData();
  }, [dToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (name, index, value) => {
    const arr = [...formData[name]];
    arr[index] = value;
    setFormData((prev) => ({
      ...prev,
      [name]: arr,
    }));
  };

  const handleAddArrayItem = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: [...prev[name], ""],
    }));
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/agent/profile`,
        formData,
        { headers: { dtoken: dToken } }
      );
      if (data.success) {
        toast.success("Profile updated!");
        setAgentData(data.agentData);
        setEditMode(false);
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Update failed");
    }
  };

  if (!agentData) return <div className="p-6">⏳ Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Agent Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block mb-1">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Company Address */}
        <div className="md:col-span-2">
          <label className="block mb-1">Company Address</label>
          <input
            type="text"
            name="companyAddress"
            value={formData.companyAddress || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Region */}
        <div>
          <label className="block mb-1">Region</label>
          <input
            type="text"
            name="region"
            value={formData.region || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Commission Rate */}
        <div>
          <label className="block mb-1">Commission Rate (%)</label>
          <input
            type="number"
            name="commissionRate"
            value={formData.commissionRate || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Languages */}
        <div className="md:col-span-2">
          <label className="block mb-1">Languages</label>
          {formData.languages?.map((lang, idx) => (
            <input
              key={idx}
              type="text"
              value={lang}
              disabled={!editMode}
              onChange={(e) =>
                handleArrayChange("languages", idx, e.target.value)
              }
              className="w-full border px-3 py-2 mb-2 rounded"
            />
          ))}
          {editMode && (
            <button
              onClick={() => handleAddArrayItem("languages")}
              className="text-blue-600 text-sm underline"
            >
              + Add Language
            </button>
          )}
        </div>

        {/* Services Offered */}
        <div className="md:col-span-2">
          <label className="block mb-1">Services Offered</label>
          {formData.servicesOffered?.map((service, idx) => (
            <input
              key={idx}
              type="text"
              value={service}
              disabled={!editMode}
              onChange={(e) =>
                handleArrayChange("servicesOffered", idx, e.target.value)
              }
              className="w-full border px-3 py-2 mb-2 rounded"
            />
          ))}
          {editMode && (
            <button
              onClick={() => handleAddArrayItem("servicesOffered")}
              className="text-blue-600 text-sm underline"
            >
              + Add Service
            </button>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setFormData(agentData); // reset changes
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
