import React, { useState, useEffect } from "react";
import axios from "axios";

const BillingList = () => {
  const [billings, setBillings] = useState([]);

  useEffect(() => {
    const fetchBillings = async () => {
      try {
        const res = await axios.get("/api/billing", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setBillings(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchBillings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/api/billing/${id}`,
        { status },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setBillings(
        billings.map((bill) => (bill._id === id ? { ...bill, status } : bill))
      );
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h3>Billing Records</h3>
      <div>
        {billings.map((billing) => (
          <div
            key={billing._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              <strong>Patient:</strong> {billing.patient.name}
            </p>
            <p>
              <strong>Amount:</strong> ${billing.amount}
            </p>
            <p>
              <strong>Description:</strong> {billing.description}
            </p>
            <p>
              <strong>Status:</strong> {billing.status}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(billing.createdAt).toLocaleDateString()}
            </p>
            {billing.status === "unpaid" && (
              <button onClick={() => updateStatus(billing._id, "paid")}>
                Mark as Paid
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingList;
