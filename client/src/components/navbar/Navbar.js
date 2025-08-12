import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show navbar on login/register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.user.role;
      } catch (error) {
        return null;
      }
    }
    return null;
  };

  const role = getUserRole();

  return (
    <nav
      style={{
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        margin: 0,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <h2 style={{ margin: 0, color: "#ecf0f1" }}>
          Hospital Management System
        </h2>
        {role && (
          <span
            style={{
              backgroundColor: "#3498db",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {role}
          </span>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {role && (
          <>
            <button
              onClick={() => {
                switch (role) {
                  case "patient":
                    navigate("/patient/dashboard");
                    break;
                  case "doctor":
                    navigate("/doctor/dashboard");
                    break;
                  case "admin":
                    navigate("/admin/dashboard");
                    break;
                  default:
                    navigate("/");
                }
              }}
              style={{
                backgroundColor: "transparent",
                color: "#ecf0f1",
                border: "1px solid #ecf0f1",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Dashboard
            </button>
            <button
              onClick={logout}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
