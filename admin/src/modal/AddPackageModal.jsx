import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { AgentContext } from "../context/AgentContext";

const AddPackageModal = ({ show, handleClose, refreshTours }) => {
  const { backendUrl } = useContext(AdminContext);
  const {dToken} =useContext(AgentContext)

  const [tourData, setTourData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    photo: "",
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTourData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/agent/package`,
        { ...tourData },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success("Tour package created!");
        handleClose();
        refreshTours();
        setTourData({
          title: "",
          city: "",
          address: "",
          distance: "",
          photo: "",
          desc: "",
          price: "",
          maxGroupSize: "",
          featured: false,
        });
      } else {
        toast.error(data.message || "Failed to create tour");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating tour");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Tour Package</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="space-y-3">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              required
              value={tourData.title}
              onChange={handleChange}
              placeholder="Tour title"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              required
              value={tourData.city}
              onChange={handleChange}
              placeholder="City name"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              required
              value={tourData.address}
              onChange={handleChange}
              placeholder="Complete address"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Distance (km)</Form.Label>
            <Form.Control
              type="number"
              name="distance"
              required
              value={tourData.distance}
              onChange={handleChange}
              placeholder="Distance in km"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Photo URL</Form.Label>
            <Form.Control
              type="text"
              name="photo"
              required
              value={tourData.photo}
              onChange={handleChange}
              placeholder="Image URL"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="desc"
              required
              value={tourData.desc}
              onChange={handleChange}
              placeholder="Tour description"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              required
              value={tourData.price}
              onChange={handleChange}
              placeholder="Price"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Max Group Size</Form.Label>
            <Form.Control
              type="number"
              name="maxGroupSize"
              required
              value={tourData.maxGroupSize}
              onChange={handleChange}
              placeholder="Maximum group size"
            />
          </Form.Group>

          <Form.Group className="flex items-center gap-2 mt-2">
            <Form.Check
              type="checkbox"
              name="featured"
              checked={tourData.featured}
              onChange={handleChange}
              label="Featured Tour"
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
          >
            Create Tour
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPackageModal;
