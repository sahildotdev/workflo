import mongoose, { Document, Schema, ObjectId } from "mongoose";

interface Task extends Document {
  _id: ObjectId;
  title: string;
  description?: string;
  status: string;
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: Date;
  userId: mongoose.Schema.Types.ObjectId; // Reference to User
}

const taskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "Urgent"] },
  deadline: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ensure this is present
});

const Task = mongoose.models.Task || mongoose.model<Task>("Task", taskSchema);

export default Task;
