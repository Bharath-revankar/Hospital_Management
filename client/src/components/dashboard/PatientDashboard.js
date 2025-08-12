import React from "react";
import AppointmentForm from "../appointments/AppointmentForm";
import AppointmentsList from "../appointments/AppointmentsList";
import MedicalRecordsList from "../records/MedicalRecordsList";
import BillingList from "../billing/BillingList";

const PatientDashboard = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Patient Dashboard</h1>
        <button 
          onClick={logout}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <AppointmentForm />
          <MedicalRecordsList />
        </div>
        <div>
          <AppointmentsList />
          <BillingList />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
