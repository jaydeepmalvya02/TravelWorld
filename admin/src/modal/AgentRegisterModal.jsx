import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import{ AdminContext} from "../context/AdminContext.jsx";
const AgentRegisterModal = ({ show, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    companyName: "",
    companyAddress: "",
    region: "",
    languages: "",
    servicesOffered: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { backendUrl } =useContext(AdminContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Adjust the URL to your backend route
      const res = await axios.post(`${backendUrl}/agent/register`, {
        ...formData,
        languages: formData.languages.split(",").map((l) => l.trim()),
        servicesOffered: formData.servicesOffered
          .split(",")
          .map((s) => s.trim()),
      });
      console.log("Registration successful:", res.data);
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(3px)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-4 overflow-hidden shadow">
          <div className="modal-header bg-dark border-0">
            <h5 className="modal-title w-100 text-center text-white fw-semibold">
              Register as a Travel Agent ✈️
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body bg-light p-4">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Company Address</label>
                  <input
                    type="text"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Region</label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Languages (comma separated)
                  </label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Services Offered (comma separated)
                  </label>
                  <input
                    type="text"
                    name="servicesOffered"
                    value={formData.servicesOffered}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register Agent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .btn-close {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
};

export default AgentRegisterModal;
