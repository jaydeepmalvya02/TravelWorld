import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AgentContext } from "../../context/AgentContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Table, Button, Badge } from "react-bootstrap";

const AgentBookings = () => {
  const { backendUrl } = useContext(AdminContext);
  const { dToken } = useContext(AgentContext);

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/agent/bookings`, {
        headers: { dtoken: dToken },
      });

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching bookings");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.patch(
        `${backendUrl}/agent/bookings/${id}/status`,
        { status },
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(`Booking ${status}`);
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    if (dToken) {
      fetchBookings();
    }
  }, [dToken]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tour Name</th>
            <th>Guest Name</th>
            <th>User Email</th>
            <th>Phone</th>
            <th>Group Size</th>
            <th>Booking Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.tourName}</td>
                <td>{booking.fullName}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.phone}</td>
                <td>{booking.guestSize}</td>
                <td>{new Date(booking.bookAt).toLocaleDateString()}</td>
                <td>
                  <Badge
                    bg={
                      booking.status === "pending"
                        ? "warning"
                        : booking.status === "confirmed"
                        ? "info"
                        : booking.status === "completed"
                        ? "success"
                        : "danger"
                    }
                  >
                    {booking.status}
                  </Badge>
                </td>
                <td>
                  {booking.status === "pending" && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => updateStatus(booking._id, "confirmed")}
                      className="me-2"
                    >
                      Confirm
                    </Button>
                  )}

                  {booking.status === "confirmed" && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => updateStatus(booking._id, "completed")}
                      className="me-2"
                    >
                      Mark Completed
                    </Button>
                  )}

                  {booking.status !== "cancelled" && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => updateStatus(booking._id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AgentBookings;
