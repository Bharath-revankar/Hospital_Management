import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch doctors to populate the dropdown
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("/api/users/doctors");
        setDoctors(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch doctors');
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
    setError('');
    setSuccess('');
    try {
      const res = await axios.post("/api/appointments", formData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setSuccess('Appointment booked successfully!');
      setFormData({ doctor: "", date: "" });
      // Optionally refresh the appointments list
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to book appointment');
      console.error(err.response?.data);
    }
  };

  if (loading) return <div>Loading doctors...</div>;

  return (
    <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Book New Appointment</h3>
      {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
      {success && <div style={{color: 'green', marginBottom: '10px'}}>{success}</div>}
      
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <select 
          name="doctor" 
          value={doctor} 
          onChange={onChange} 
          required
          style={{ padding: '8px', fontSize: '14px' }}
        >
          <option value="">Select a Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name}
            </option>
          ))}
        </select>
        
        <input
          type="datetime-local"
          name="date"
          value={date}
          onChange={onChange}
          required
          style={{ padding: '8px', fontSize: '14px' }}
        />
        
        <input 
          type="submit" 
          value="Book Appointment" 
          style={{ 
            padding: '10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        />
      </form>
    </div>
  );
};

export default AppointmentForm;
