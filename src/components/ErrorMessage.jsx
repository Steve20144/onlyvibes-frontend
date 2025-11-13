// src/components/ErrorMessage.jsx
import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div
      style={{
        background: "rgba(255,74,91,0.1)",
        border: "1px solid var(--error)",
        color: "#fff",
        borderRadius: 8,
        padding: 8,
        fontSize: 13,
        marginBottom: 12
      }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
