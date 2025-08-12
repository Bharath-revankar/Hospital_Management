import React from "react";
import AppointmentForm from "../appointments/AppointmentForm";
import AppointmentsList from "../appointments/AppointmentsList";
import MedicalRecordsList from "../records/MedicalRecordsList";
import BillingList from "../billing/BillingList";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <h1>Patient Dashboard</h1>
        <p>Welcome to your personal health management portal</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">Book Appointment</div>
          <div className="section-content">
            <AppointmentForm />
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">My Appointments</div>
          <div className="section-content">
            <AppointmentsList />
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">Medical Records</div>
          <div className="section-content">
            <MedicalRecordsList />
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">Billing Information</div>
          <div className="section-content">
            <BillingList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
