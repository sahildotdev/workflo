"use client";

import React from "react";

interface TaskCardProps {
  title: string;
  description?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-gray-600 mt-2">{description}</p>}
      <div className="absolute top-2 right-2 space-x-2">
        <button onClick={onEdit} className="text-blue-500">
          Edit
        </button>
        <button onClick={onDelete} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
