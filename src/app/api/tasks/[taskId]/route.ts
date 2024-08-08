import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";
import { verifyToken } from "@/utils/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  await dbConnect();
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { userId } = verifyToken(token);

  const task = await Task.findOneAndUpdate(
    { _id: params.taskId, user: userId },
    { $set: await req.json() },
    { new: true }
  );

  if (!task) {
    return NextResponse.json(
      { error: "Task not found or unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json(task);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  await dbConnect();
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { userId } = verifyToken(token);

  const task = await Task.findOneAndDelete({
    _id: params.taskId,
    user: userId,
  });

  if (!task) {
    return NextResponse.json(
      { error: "Task not found or unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Task deleted successfully" });
}
