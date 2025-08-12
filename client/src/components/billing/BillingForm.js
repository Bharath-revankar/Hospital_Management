import React, { useState, useEffect } from "react";
import axios from "axios";

const BillingForm = () => {
  const [formData, setFormData] = useState({
    patient: "",
    amount: "",
    description: "",
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patients to populate dropdown
    const fetchPatients = async () => {
      try {
        const res = await axios.get("/api/users/patients", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setPatients(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchPatients();
  }, []);

  const { patient, amount, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/billing", formData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      console.log("Billing record created:", res.data);
      setFormData({ patient: "", amount: "", description: "" });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h3>Create Invoice</h3>
      <form onSubmit={onSubmit}>
        <select name="patient" value={patient} onChange={onChange} required>
          <option value="">Select a Patient</option>
          {patients.map((pat) => (
            <option key={pat._id} value={pat._id}>
              {pat.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={onChange}
          placeholder="Amount"
          required
          step="0.01"
        />
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Description of services..."
          rows="3"
          cols="50"
        />
        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
};

export default BillingForm;
