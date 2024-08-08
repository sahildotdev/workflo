import mongoose, { Schema, Document, Model } from "mongoose";

interface ITask extends Document {
  title: string;
  description?: string;
  status: "To-Do" | "In Progress" | "Under Review" | "Completed";
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: Date;
  user: mongoose.Schema.Types.ObjectId;
}

const TaskSchema: Schema<ITask> = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    required: true,
    enum: ["To-Do", "In Progress", "Under Review", "Completed"],
  },
  priority: { type: String, enum: ["Low", "Medium", "Urgent"] },
  deadline: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Task: Model<ITask> = mongoose.model("Task", TaskSchema);

export default Task;
