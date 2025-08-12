import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/api/appointments", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setAppointments(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments");
        setLoading(false);
        console.error(err.response?.data);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h3>Your Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div>
          {appointments.map((apt) => (
            <div key={apt._id} className="appointment-card">
              <div className="item-header">
                <strong>Doctor:</strong> {apt.doctor?.name || "N/A"}
              </div>
              <p>
                <strong>Patient:</strong> {apt.patient?.name || "N/A"}
              </p>
              <p>
                <strong>Date:</strong> {new Date(apt.date).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>
                <span className={`appointment-status status-${apt.status}`}>
                  {apt.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
