import React, { useState, useEffect } from "react";
import axios from "axios";

const MedicalRecordForm = () => {
  const [formData, setFormData] = useState({
    patient: "",
    record: "",
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

  const { patient, record } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/records", formData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      console.log("Record created:", res.data);
      setFormData({ patient: "", record: "" });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h3>Add Medical Record</h3>
      <form onSubmit={onSubmit}>
        <select name="patient" value={patient} onChange={onChange} required>
          <option value="">Select a Patient</option>
          {patients.map((pat) => (
            <option key={pat._id} value={pat._id}>
              {pat.name}
            </option>
          ))}
        </select>
        <textarea
          name="record"
          value={record}
          onChange={onChange}
          placeholder="Medical record details..."
          required
          rows="4"
          cols="50"
        />
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
};

export default MedicalRecordForm;
