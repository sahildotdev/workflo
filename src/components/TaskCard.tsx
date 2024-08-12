import React from "react";

const TaskCard = ({ task }: any) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Deadline: {task.deadline}</p>
    </div>
  );
};

export default TaskCard;
