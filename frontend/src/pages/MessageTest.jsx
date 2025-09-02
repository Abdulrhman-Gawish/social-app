import React, { useEffect, useState } from "react";
import { api } from "@api/axios";


function MessageTest() {
  const [message, setMessage] = useState("Loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await api.get("/");
        setMessage(response.data); 
      } catch (err) {
        console.error(err);
        setError("Failed to fetch message");
      }
    };

    getMessage();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{error ? error : message}</h1>
    </div>
  );
}

export default MessageTest;
