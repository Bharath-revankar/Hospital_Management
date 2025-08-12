import React from "react";
import AppointmentsList from "../appointments/AppointmentsList";
import BillingForm from "../billing/BillingForm";
import BillingList from "../billing/BillingList";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AppointmentsList />
      <BillingForm />
      <BillingList />
      {/* Add user management here */}
    </div>
  );
};

export default AdminDashboard;
