import React, { useState, useEffect } from "react";
import axios from "axios";

const MedicalRecordsList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get("/api/records", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setRecords(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchRecords();
  }, []);

  return (
    <div>
      <h3>Medical Records</h3>
      <div>
        {records.map((record) => (
          <div
            key={record._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              <strong>Patient:</strong> {record.patient.name}
            </p>
            <p>
              <strong>Doctor:</strong> {record.doctor.name}
            </p>
            <p>
              <strong>Record:</strong> {record.record}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(record.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecordsList;
