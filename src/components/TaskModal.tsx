"use client";

import React, { useState } from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    description: string,
    status: string,
    priority: string,
    deadline?: string
  ) => void;
  initialTitle?: string;
  initialDescription?: string;
  initialPriority?: string;
  initialDeadline?: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTitle = "",
  initialDescription = "",
  initialPriority = "Low",
  initialDeadline = "",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState(initialPriority);
  const [deadline, setDeadline] = useState(initialDeadline);

  const handleSave = () => {
    onSave(title, description, status, priority, deadline);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">New Task</h2>
        <input
          className="border p-2 w-full mb-4"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-4"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="border p-2 w-full mb-4"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="Urgent">Urgent</option>
        </select>
        <input
          type="date"
          className="border p-2 w-full mb-4"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <div className="flex justify-end">
          <button className="mr-4" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
