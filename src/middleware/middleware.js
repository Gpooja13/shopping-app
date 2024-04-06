import jwt from "jsonwebtoken";
import User from "../models/user";
import dbConnect from "./connectdb";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export default async function requireLogin(request) {
  const header = headers(request);
  const authorization = header.get("Authorization");

  const jwtSecret = "jwtSecret";

  try {
    if (!authorization) {
      return { error: "Login first" };
    }
    const token = authorization.replace("Bearer ", "");

    const payload = jwt.verify(token, jwtSecret);

    const { email } = payload;
    const userData = await User.findOne({ email: email });

    if (!userData) {
      return { error: "User not found" };
    }
    request.userData = userData;
    return NextResponse.next();
    
  } catch (error) {
    console.error("Error in requireLogin middleware:", error);
    return { error: "Unauthorized" };
  }
}
