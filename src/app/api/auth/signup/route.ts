import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = new User({ email, password });
  await user.save();

  return NextResponse.json({ message: "User created successfully" });
}
