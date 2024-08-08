import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";
import { verifyToken } from "@/utils/auth";

export async function GET(req: NextRequest) {
  await dbConnect();
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { userId } = verifyToken(token);

  const tasks = await Task.find({ user: userId });

  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { userId } = verifyToken(token);

  const { title, description, status, priority, deadline } = await req.json();
  const task = new Task({
    title,
    description,
    status,
    priority,
    deadline,
    user: userId,
  });
  await task.save();

  return NextResponse.json(task);
}
