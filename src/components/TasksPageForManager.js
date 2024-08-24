import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/TasksPageForManager.css";

const TasksPageForManager = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const projectsResponse = await fetch(
          `http://localhost:8080/api/projects/by-manager/${user.userId}`
        );
        const projects = await projectsResponse.json();

        const projectIds = projects.map((project) => project.projectId);

        const tasksPromises = projectIds.map((projectId) =>
          fetch(`http://localhost:8080/api/tasks/project/${projectId}`).then(
            (res) => res.json()
          )
        );

        const tasksArray = await Promise.all(tasksPromises);
        const allTasks = tasksArray.flat();

        setTasks(allTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user.userId]);

  return (
    <div className="tasks-page-container">
      <br></br>
      {tasks.length > 0 ? (
        <div className="tasks-page-table">
          <div className="tasks-page-header">
            <div className="tasks-page-header-item">Task Name</div>
            <div className="tasks-page-header-item">Created Date</div>
            <div className="tasks-page-header-item">Project Name</div>
            <div className="tasks-page-header-item">User</div>
          </div>
          <div className="tasks-page-body">
            {tasks.map((task) => (
              <div key={task.taskId} className="tasks-page-row">
                <div className="tasks-page-item">{task.taskName}</div>
                <div className="tasks-page-item">{task.createdAt}</div>
                <div className="tasks-page-item">
                  {task.project.projectName}
                </div>
                <div className="tasks-page-item">
                  {task.user ? task.user.userName : "N/A"}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="tasks-page-empty-message">
          No tasks found for your projects.
        </p>
      )}
    </div>
  );
};

export default TasksPageForManager;
