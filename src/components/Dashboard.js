import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState({
    totalProjects: 0,
    totalTeam: 0,
    totalTasks: 0,
    totalUsers: 0,
    totalClients: 0,
  });
  const [detailedData, setDetailedData] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [projectsRes, usersRes, tasksRes, clientsRes, teamsRes] = await Promise.all(
          [
            fetch("https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/projects"),
            fetch("https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/admin/users"),
            fetch("https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/tasks"),
            fetch("https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/clients"),
            fetch("https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/teams"),
          ]
        );

        const projects = await projectsRes.json();
        const users = await usersRes.json();
        const tasks = await tasksRes.json();
        const clients = await clientsRes.json();
        const teams = await teamsRes.json();

        setData({
          totalProjects: projects.length,
          totalTeam: teams.length,
          totalTasks: tasks.length,
          totalUsers: users.length,
          totalClients: clients.length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  const handleCardClick = async (type) => {
    setActiveCard(type);
    try {
      let res;
      switch (type) {
        case "projects":
          res = await fetch("https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/projects");
          break;
        case "team":
          res = await fetch("https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/teams");
          break;
        case "users":
          res = await fetch("https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/admin/users");
          break;
        case "clients":
          res = await fetch("https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/clients");
          break;
        default:
          return;
      }
      const details = await res.json();
      setDetailedData(details);
    } catch (error) {
      console.error("Error fetching detailed data:", error);
    }
  };

  const renderTableHeaders = () => {
    switch (activeCard) {
      case "projects":
        return (
          <>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Client Name</th>
            <th>Manager</th>
          </>
        );
      case "team":
        return (
          <>
            <th>Team Name</th>
            <th>Manager</th>
            <th>Project</th>
          </>
        );
      case "users":
        return (
          <>
            <th>User Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Specialization</th>
          </>
        );
      case "clients":
        return (
          <>
            <th>Client Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
          </>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    switch (activeCard) {
      case "projects":
        return detailedData.map((project) => (
          <tr key={project.projectId}>
            <td>{project.projectName}</td>
            <td>{project.description}</td>
            <td>{project.startDate}</td>
            <td>{project.endDate}</td>
            <td>{project.client.clientName}</td>
            <td>{project.manager.userName}</td>
          </tr>
        ));
      case "team":
        return detailedData.map((team) => (
          <tr key={team.teamId}>
            <td>{team.teamName}</td>
            <td>{team.manager.userName}</td>
            <td>{team.project.projectName}</td>
          </tr>
        ));
      case "users":
        return detailedData.map((user) => (
          <tr key={user.userId}>
            <td>{user.userName}</td>
            <td>{user.userRole}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.status}</td>
            <td>{user.specialization}</td>
          </tr>
        ));
      case "clients":
        return detailedData.map((client) => (
          <tr key={client.clientId}>
            <td>{client.clientName}</td>
            <td>{client.clientCompanyName}</td>
            <td>{client.clientEmail}</td>
            <td>{client.clientPhone}</td>
          </tr>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      {activeCard ? (
        <div className="details-table">
          <h3>
            Details for {activeCard.charAt(0).toUpperCase() + activeCard.slice(1)}
          </h3>
          <table className="table table-striped">
            <thead>
              <tr>{renderTableHeaders()}</tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
          <button onClick={() => setActiveCard(null)}>Go Back</button>
        </div>
      ) : (
        <>
          <div
            className="dashboardcard"
            style={{ backgroundColor: "#6699cc" }}
            onClick={() => handleCardClick("projects")}
          >
            <h3>Total Projects</h3>
            <p>{data.totalProjects}</p>
          </div>
          <div
            className="dashboardcard"
            style={{ backgroundColor: "#6699cc" }}
            onClick={() => handleCardClick("team")}
          >
            <h3>Total Team</h3>
            <p>{data.totalTeam}</p>
          </div>
          <div
            className="dashboardcard"
            style={{ backgroundColor: "#6699cc" }}
          >
            <h3>Total Tasks</h3>
            <p>{data.totalTasks}</p>
          </div>
          <div
            className="dashboardcard"
            style={{ backgroundColor: "#6699cc" }}
            onClick={() => handleCardClick("users")}
          >
            <h3>Total Users</h3>
            <p>{data.totalUsers}</p>
          </div>
          <div
            className="dashboardcard"
            style={{ backgroundColor: "#6699cc" }}
            onClick={() => handleCardClick("clients")}
          >
            <h3>Total Clients</h3>
            <p>{data.totalClients}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
