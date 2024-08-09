import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

// Secret key for JWT (should be in .env)
const JWT_SECRET = process.env.JWT_SECRET as string;

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

    // Create a new task for the user
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
