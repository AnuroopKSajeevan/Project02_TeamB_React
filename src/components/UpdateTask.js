import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/UpdateTask.css";

const UpdateTask = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [taskDetails, setTaskDetails] = useState({
    endDate: "",
    description: "",
    userId: "",
    milestoneId: "",
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/projects/${projectId}`
        );
        const data = await response.json();
        setProject(data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/tasks/project/${projectId}`
        );
        const data = await response.json();
        setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/admin/users");
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    const fetchMilestones = async () => {
      try {
        const response = await fetch("https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/milestones");
        const data = await response.json();
        setMilestones(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch milestones:", err);
      }
    };

    fetchProject();
    fetchTasks();
    fetchUsers();
    fetchMilestones();
  }, [projectId]);

  useEffect(() => {
    if (users.length > 0) {
      const filtered = users.filter((user) => user.userRole === "TEAM_MEMBER");
      setFilteredUsers(filtered);
    }
  }, [users]);

  useEffect(() => {
    if (selectedTask) {
      const task = tasks.find((task) => task.taskId === selectedTask);
      if (task) {
        setTaskDetails({
          endDate: task.endDate,
          description: task.description,
          userId: task.user?.userId || "",
          milestoneId: task.milestone?.milestoneId || "",
        });
      }
    }
  }, [selectedTask, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedTask = {
        endDate: taskDetails.endDate,
        description: taskDetails.description,
        user: { userId: taskDetails.userId },
        milestone: { milestoneId: taskDetails.milestoneId },
      };

      const response = await fetch(
        `https://taskmanagementspringboot-aahfeqggang5fdee.southindia-01.azurewebsites.net/api/tasks/manager/${selectedTask}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) throw new Error("Failed to update task");

      const result = await response.json();
      alert("Task updated successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-task-wrapper">
      <h2 className="update-task-title">Update Task</h2>
      {project && (
        <div className="project-info">
          <h3 className="project-info-heading">
            Project: {project.projectName}
          </h3>
        </div>
      )}
      <form className="update-task-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="taskId" className="field-group-label">
            Task Name
          </label>
          <select
            id="taskId"
            name="taskId"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="field-group-select"
            required
          >
            <option value="">Select Task</option>
            {tasks.map((task) => (
              <option key={task.taskId} value={task.taskId}>
                {task.taskName}
              </option>
            ))}
          </select>
        </div>
        {selectedTask && (
          <>
            <div className="field-group">
              <label htmlFor="endDate" className="field-group-label">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={taskDetails.endDate}
                onChange={handleChange}
                className="field-group-input"
              />
            </div>
            <div className="field-group">
              <label htmlFor="description" className="field-group-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={taskDetails.description}
                onChange={handleChange}
                className="field-group-textarea"
              />
            </div>
            <div className="field-group">
              <label htmlFor="userId" className="field-group-label">
                Assigned User
              </label>
              <select
                id="userId"
                name="userId"
                value={taskDetails.userId}
                onChange={handleChange}
                className="field-group-select"
              >
                <option value="">Select User</option>
                {filteredUsers.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.userName}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-group">
              <label htmlFor="milestoneId" className="field-group-label">
                Milestone
              </label>
              <select
                id="milestoneId"
                name="milestoneId"
                value={taskDetails.milestoneId}
                onChange={handleChange}
                className="field-group-select"
              >
                <option value="">Select Milestone</option>
                {milestones.map((milestone) => (
                  <option
                    key={milestone.milestoneId}
                    value={milestone.milestoneId}
                  >
                    {milestone.milestoneName}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Updating..." : "Update Task"}
            </button>
            {/* {error && <p className="error-message">{error}</p>} */}
          </>
        )}
      </form>
    </div>
  );
};

export default UpdateTask;
