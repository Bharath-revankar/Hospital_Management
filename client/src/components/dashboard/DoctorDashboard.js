import React from "react";
import AppointmentsList from "../appointments/AppointmentsList";
import MedicalRecordForm from "../records/MedicalRecordForm";
import MedicalRecordsList from "../records/MedicalRecordsList";
import BillingForm from "../billing/BillingForm";
import BillingList from "../billing/BillingList";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  return (
    <div className="doctor-dashboard">
      <div className="dashboard-header">
        <h1>Doctor Dashboard</h1>
        <p>Manage your patients and medical practice</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">Patient Appointments</div>
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
          <div className="section-header">Add Medical Record</div>
          <div className="section-content">
            <MedicalRecordForm />
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">Billing Management</div>
          <div className="section-content">
            <BillingForm />
            <div style={{ marginTop: "20px" }}>
              <BillingList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
