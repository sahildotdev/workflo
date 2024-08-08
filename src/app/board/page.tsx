import React, { useEffect, useState } from "react";
import axios from "axios";
import Board from "@/components/Board";

const BoardPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <Board tasks={tasks} />
    </div>
  );
};

export default BoardPage;
