import React from "react";
import { Link, useLocation } from "react-router-dom";
import SignOutButton from "./SignOutButton";

const AppBar = ({ role, setIsSignedIn }) => {
  const location = useLocation();

  const navItems = [
    { path: "/products", label: "Products" },
    { path: "/warehouses", label: "Warehouses" },
    { path: "/customers", label: "Customers" },
    { path: "/inbound-invoices", label: "Inbound Invoices" },
    { path: "/outbound-invoices", label: "Outbound Invoices" },
  ];

  const styles = {
    appBar: {
      backgroundColor: "#f8f9fa",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    nav: {
      display: "flex",
      gap: "20px",
    },
    link: {
      textDecoration: "none",
      color: "#333",
      fontWeight: 500,
      padding: "5px 10px",
      borderRadius: "4px",
      transition: "background-color 0.3s",
    },
    activeLink: {
      backgroundColor: "#e9ecef",
    },
    role: {
      fontWeight: "bold",
      marginRight: "20px",
    },
  };

  return (
    <div style={styles.appBar}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={styles.role}>{role}</p>
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.link,
                ...(location.pathname === item.path ? styles.activeLink : {}),
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <SignOutButton setIsSignedIn={setIsSignedIn} />
    </div>
  );
};

export default AppBar;
