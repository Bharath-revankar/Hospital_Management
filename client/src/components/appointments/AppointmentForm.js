import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch doctors to populate the dropdown
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("/api/users/doctors");
        setDoctors(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctors");
        setLoading(false);
        console.error(err.response?.data);
      }
    };
    fetchDoctors();
  }, []);

  const { doctor, date } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("/api/appointments", formData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setSuccess("Appointment booked successfully!");
      setFormData({ doctor: "", date: "" });
      // Optionally refresh the appointments list
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to book appointment");
      console.error(err.response?.data);
    }
  };

  if (loading) return <div className="loading">Loading doctors...</div>;

  return (
    <div>
      <h3>Book New Appointment</h3>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={onSubmit} className="form-container">
        <div className="form-group">
          <select
            name="doctor"
            value={doctor}
            onChange={onChange}
            required
            className="form-select"
          >
            <option value="">Select a Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <input
            type="datetime-local"
            name="date"
            value={date}
            onChange={onChange}
            required
            className="form-input"
          />
        </div>

        <input type="submit" value="Book Appointment" className="btn-primary" />
      </form>
    </div>
  );
};

export default AppointmentForm;
