import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/api/appointments", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setAppointments(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch appointments');
        setLoading(false);
        console.error(err.response?.data);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Your Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div>
          {appointments.map((apt) => (
            <div key={apt._id} style={{ 
              padding: '15px', 
              margin: '10px 0', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              backgroundColor: '#f9f9f9'
            }}>
              <p><strong>Doctor:</strong> {apt.doctor?.name || 'N/A'}</p>
              <p><strong>Patient:</strong> {apt.patient?.name || 'N/A'}</p>
              <p><strong>Date:</strong> {new Date(apt.date).toLocaleString()}</p>
              <p><strong>Status:</strong> 
                <span style={{ 
                  color: apt.status === 'confirmed' ? 'green' : 
                         apt.status === 'pending' ? 'orange' : 'red',
                  fontWeight: 'bold',
                  marginLeft: '5px'
                }}>
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
