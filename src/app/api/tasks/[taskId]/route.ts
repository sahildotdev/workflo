import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function PUT(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  await dbConnect();

  try {
    // Extract and verify the token
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    let userId: string;
    if (typeof decoded !== "string" && (decoded as JwtPayload).userId) {
      userId = (decoded as JwtPayload).userId as string;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // Ensure taskId is provided
    const taskId = params.taskId;
    if (!taskId) {
      return NextResponse.json(
        { success: false, message: "Task ID is required" },
        { status: 400 }
      );
    }

    // Extract task details from request body
    const { title, description, status, priority, deadline } = await req.json();

    // Ensure title is provided
    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    // Find and update the task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId }, // Ensure task belongs to user
      { title, description, status, priority, deadline },
      { new: true }
    );

    // Check if task was updated
    if (!updatedTask) {
      return NextResponse.json(
        {
          success: false,
          message: "Task not found or you do not have permission to update it",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (err) {
    console.error("Error updating task", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
