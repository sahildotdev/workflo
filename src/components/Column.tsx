import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const Column = ({ tasks }: any) => {
  return (
    <div className="bg-gray-100 p-4 rounded">
      {tasks.map((task, index) => (
        <Draggable key={task._id} draggableId={task._id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard task={task} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default Column;
