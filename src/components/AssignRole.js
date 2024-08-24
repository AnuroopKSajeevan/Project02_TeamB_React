import React, { useState } from "react";
import axios from "axios";
import "../css/AssignRole.css";

const AssignRole = () => {
  const [formData, setFormData] = useState({
    userid: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { userid, role } = formData;

    if (!userid || !role) {
      alert("Please fill in all the required fields.");
      return;
    }

    axios
      .put(`http://localhost:8080/api/admin/assignRole/${userid}`, {
        role,
      })
      .then((response) => {
        console.log("Role assigned:", response.data);
        alert("Role assigned successfully!");
        setFormData({
          userid: "",
          role: "",
        });
      })
      .catch((error) => {
        console.error("There was an error assigning the role!", error);
        alert("There was an error assigning the role!");
      });
  };

  return (
    <div id="createUserForm" className="assign-role-form-container">
      <h2 className="assign-role-title">Assign Role</h2>
      <form id="userForm" className="assign-role-form" onSubmit={handleSubmit}>
        <label htmlFor="userid" className="assign-role-label">UserID:</label>
        <input
          type="number"
          id="userid"
          name="userid"
          className="assign-role-input"
          value={formData.userid}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="role" className="assign-role-label">Role:</label>
        <select
          id="role"
          name="role"
          className="assign-role-select"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="" className="assign-role-option">Select Role</option>
          <option value="ADMIN" className="assign-role-option">ADMIN</option>
          <option value="PROJECT_MANAGER" className="assign-role-option">PROJECT_MANAGER</option>
          <option value="TEAM_MEMBER" className="assign-role-option">TEAM_MEMBER</option>
        </select>
        <br />

        <button type="submit" className="assign-role-button common">
          Assign Role
        </button>
      </form>
    </div>
  );
};

export default AssignRole;
