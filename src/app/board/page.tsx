"use client";

import React, { useEffect, useState } from "react";
import TaskColumn from "@/components/TaskColumn";
import { Task, TaskColumns } from "@/utils/types";

const BoardPage: React.FC = () => {
  const [tasksByColumn, setTasksByColumn] = useState<TaskColumns>({
    "To-Do": [],
    "In Progress": [],
    "Under Review": [],
    Completed: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) return;

      try {
        const response = await fetch("/api/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          const tasks: Task[] = data.tasks;

          // Separate tasks by their status
          const columns: TaskColumns = {
            "To-Do": tasks.filter((task) => task.status === "To-Do"),
            "In Progress": tasks.filter(
              (task) => task.status === "In Progress"
            ),
            "Under Review": tasks.filter(
              (task) => task.status === "Under Review"
            ),
            Completed: tasks.filter((task) => task.status === "Completed"),
          };

          setTasksByColumn(columns);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-row justify-center space-x-4 p-8 bg-gray-200 min-h-screen">
      {Object.keys(tasksByColumn).map((status) => (
        <TaskColumn
          key={status}
          title={status}
          tasksByColumn={tasksByColumn}
          setTasksByColumn={setTasksByColumn}
        />
      ))}
    </div>
  );
};

export default BoardPage;
