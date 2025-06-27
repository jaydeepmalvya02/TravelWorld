import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const TourList = () => {
  const { backendUrl, aToken } = useContext(AdminContext);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tours
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data: tourData } = await axios.get(
          `${backendUrl}/admin/all-tours`
        );
        if (!tourData.success) {
          throw new Error("Failed to fetch tours");
        }
        setTours(tourData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [backendUrl]);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;

    try {
      const res = await fetch(`${backendUrl}/api/v1/tours/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to delete");

      setTours((prev) => prev.filter((tour) => tour._id !== id));
      alert("✅ Tour deleted successfully");
    } catch (err) {
      alert("❌ Delete failed: " + err.message);
    }
  };

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );

  return (
    <div className="container py-4">
      <h3 className="mb-4">All Tours (Admin Panel)</h3>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>City</th>
            <th>Price</th>
            <th>Group Size</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id}>
              <td>
                <img
                  src={tour.photo || "https://via.placeholder.com/80x60"}
                  alt={tour.title}
                  style={{ width: "80px", height: "60px", objectFit: "cover" }}
                />
              </td>
              <td>{tour.title}</td>
              <td>{tour.city}</td>
              <td>₹{tour.price}</td>
              <td>{tour.maxGroupSize}</td>
              <td>{tour.featured ? "✅" : "❌"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => alert(`Edit tour ID: ${tour._id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(tour._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TourList;
