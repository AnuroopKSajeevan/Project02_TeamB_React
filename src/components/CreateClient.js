import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CreateClient.css";

const CreateClient = () => {
  const initialFormData = {
    clientId: "", // This will be excluded from the payload
    clientName: "",
    clientCompanyName: "",
    clientEmail: "",
    clientPhone: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [clientCount, setClientCount] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClient = (e) => {
    e.preventDefault();

    const { clientName, clientCompanyName, clientEmail, clientPhone } =
      formData;

    console.log("Form data before validation:", formData);

    if (!clientName || !clientCompanyName || !clientEmail || !clientPhone) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Create a new object excluding clientId
    const { clientId, ...payload } = formData;

    axios
      .post(
        "https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/clients",
        payload // Send the payload without clientId
      )
      .then((response) => {
        console.log("Form data submitted:", response.data);
        alert("Client created successfully!");
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("There was an error creating the client!", error);
        alert("There was an error creating the client!");
      });
  };

  return (
    <div className="create-client-form-container">
      <h2 className="create-client-title">Create Client</h2>
      <form id="clientForm" className="create-client-form">
        <label htmlFor="name" className="create-client-label">
          Client Name:
        </label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          className="create-client-input"
          value={formData.clientName}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="companyName" className="create-client-label">
          Client Company:
        </label>
        <input
          type="text"
          id="clientCompanyName"
          name="clientCompanyName"
          className="create-client-input"
          value={formData.clientCompanyName}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="email" className="create-client-label">
          Client Email:
        </label>
        <input
          type="email"
          id="clientEmail"
          name="clientEmail"
          className="create-client-input"
          value={formData.clientEmail}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="phone" className="create-client-label">
          Phone:
        </label>
        <input
          type="tel"
          id="clientPhone"
          name="clientPhone"
          className="create-client-input"
          value={formData.clientPhone}
          onChange={handleChange}
          required
          placeholder="+917643569867"
        />
        <br />

        <button
          type="button"
          className="create-client-button common"
          onClick={handleClient}
        >
          Create Client
        </button>
      </form>
    </div>
  );
};

export default CreateClient;
