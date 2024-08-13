import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Existing POST handler
export async function POST(req: Request) {
  await dbConnect();

  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Extract token from the Authorization header
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    let userId: string;
    if (typeof decoded !== "string" && decoded.userId) {
      userId = decoded.userId;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const { title, description, status, priority, deadline } = await req.json();

    const newTask = await Task.create({
      userId,
      title,
      description,
      status,
      priority,
      deadline,
    });

    return NextResponse.json({ success: true, task: newTask });
  } catch (err) {
    console.error("Error creating task", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// New GET handler
export async function GET(req: Request) {
  await dbConnect();

  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Extract token from the Authorization header
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    let userId: string;
    if (typeof decoded !== "string" && decoded.userId) {
      userId = decoded.userId;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // Fetch tasks for the user
    const tasks = await Task.find({ userId });

    return NextResponse.json({ success: true, tasks });
  } catch (err) {
    console.error("Error fetching tasks", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
