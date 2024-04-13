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
      console.log("!authorization");
      return NextResponse.json({ error: "Login first" });
    }
    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, jwtSecret);

    if (!payload) {
      return NextResponse.json({ error: "User not found" });
    }

    const { email } = payload;
    const userData = await User.findOne({ email: email });

    if (!userData) {
      return NextResponse.json({ error: "User not found" });
    }
 
    if (userData.admin==="true") {
      request.adminData = userData;
      return NextResponse.next();
    }

    request.userData = userData;
    return NextResponse.next();

  } catch (error) {
    console.error("Error in requireLogin middleware:", error);
    // const url = new URL("/",request.nextUrl.origin);
    //  return NextResponse.redirect(url.toString());
    return NextResponse.json({ error: "Unauthorized" });
  }
}
