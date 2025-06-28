import React, { useContext, useEffect, useState } from "react";
import { AgentContext } from "../../context/AgentContext";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import AddPackageModal from "../../modal/AddPackageModal.jsx";
import { Button, Table } from "react-bootstrap";

const AgentPackages = () => {
  const { dToken } = useContext(AgentContext);
  const { backendUrl } = useContext(AdminContext);

  const [tours, setTours] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchTours = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/agent/package`, {
        headers: { dtoken: dToken },
      });
      if (data.success) {
        setTours(data.packageData);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch tours");
    }
  };

  const deleteTour = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;

    try {
      const { data } = await axios.delete(`${backendUrl}/agent/tours/${id}`, {
        headers: { dtoken: dToken },
      });
      if (data.success) {
        toast.success("Tour deleted");
        fetchTours();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting tour");
    }
  };

  const handleEdit = (tour) => {
    // 👉 You can implement this: open an EditModal and pass tour data
    toast.info(`Edit: ${tour.title}`);
  };

  useEffect(() => {
    if (dToken) {
      fetchTours();
    }
  }, [dToken]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Tour Packages</h2>
        <Button onClick={() => setShowAddModal(true)}>Add New Package</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>City</th>
            <th>Price</th>
            <th>Max Group</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.length ? (
            tours.map((tour) => (
              <tr key={tour._id}>
                <td>{tour.title}</td>
                <td>{tour.city}</td>
                <td>${tour.price}</td>
                <td>{tour.maxGroupSize}</td>
                <td>{tour.featured ? "Yes" : "No"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEdit(tour)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteTour(tour._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No packages found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <AddPackageModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        refreshTours={fetchTours}
      />
    </div>
  );
};

export default AgentPackages;
