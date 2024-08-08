"use client";

import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";

const Board = ({ tasks }: any) => {
  const columns = {
    "To-Do": [],
    "In Progress": [],
    "Under Review": [],
    Completed: [],
  };

  tasks.forEach((task: { status: string | number }) => {
    columns[task.status].push(task);
  });

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex space-x-4">
        {Object.keys(columns).map((columnId) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/4"
              >
                <h2 className="text-xl font-bold mb-4">{columnId}</h2>
                <Column tasks={columns[columnId]} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
