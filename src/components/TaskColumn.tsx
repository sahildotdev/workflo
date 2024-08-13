"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";
import { Task, TaskColumns } from "@/utils/types";

interface TaskColumnProps {
  title: string;
  tasksByColumn: TaskColumns;
  setTasksByColumn: React.Dispatch<React.SetStateAction<TaskColumns>>;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasksByColumn,
  setTasksByColumn,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>(tasksByColumn[title] || []);

  const handleSaveTask = async (title: string, description: string) => {
    const newTask = { title, description, columnId: title };
    if (editIndex !== null) {
      await fetch(`/api/tasks/${tasks[editIndex]._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { ...updatedTasks[editIndex], ...newTask };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const createdTask: Task = await response.json();
      setTasks([...tasks, createdTask]);
    }
  };

  const handleEditTask = (index: number) => {
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (index: number) => {
    const taskId = tasks[index]._id;
    await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceTasks = Array.from(tasksByColumn[source.droppableId]);
    const destinationTasks = Array.from(tasksByColumn[destination.droppableId]);

    const [movedTask] = sourceTasks.splice(source.index, 1);
    movedTask.columnId = destination.droppableId;
    destinationTasks.splice(destination.index, 0, movedTask);

    setTasksByColumn({
      ...tasksByColumn,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destinationTasks,
    });

    await fetch("/api/tasks/updateOrder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: movedTask._id,
        newColumnId: destination.droppableId,
        newIndex: destination.index,
      }),
    });
  };

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg p-4 w-64 min-h-screen mx-2">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        + Add Task
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={title}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex-grow"
            >
              {tasksByColumn[title].map((task, index) => (
                <Draggable
                  key={task._id.toString()}
                  draggableId={task._id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-2"
                    >
                      <TaskCard
                        title={task.title}
                        description={task.description}
                        onEdit={() => handleEditTask(index)}
                        onDelete={() => handleDeleteTask(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditIndex(null);
        }}
        onSave={handleSaveTask}
        initialTitle={editIndex !== null ? tasks[editIndex].title : ""}
        initialDescription={
          editIndex !== null ? tasks[editIndex].description : ""
        }
      />
    </div>
  );
};

export default TaskColumn;
