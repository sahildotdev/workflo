import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

export async function PATCH(req: Request) {
  await dbConnect();

  try {
    const { taskId, newColumnId, newIndex } = await req.json();

    if (!taskId || !newColumnId) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 }
      );
    }

    task.columnId = newColumnId;
    await task.save();

    return NextResponse.json({ success: true, task });
  } catch (err) {
    console.error("Error updating task order", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
