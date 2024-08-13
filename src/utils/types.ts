import { ObjectId } from "mongoose";

export interface Task {
  columnId: any;
  _id: ObjectId;
  title: string;
  description?: string;
  status: string;
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: Date;
  userId: string;
}

export interface TaskColumns {
  [key: string]: Task[];
  "To-Do": Task[];
  "In Progress": Task[];
  "Under Review": Task[];
  Completed: Task[];
}
