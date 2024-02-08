import { NextResponse } from "next/server";
import user from "../../../models/user";
import connectdb from "../../../middleware/connectdb";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export async function POST(request) {
  const payload = await request.json();
  const u = await user.findOne({ email: payload.email });
  if (u) {
    var bytes = CryptoJS.AES.decrypt(u.password, "secretkey123");
    var decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (payload.email === u.email && payload.password === decryptedPassword) {
      var token = jwt.sign({ email: u.email, name: u.name }, "jwtSecret");

      return NextResponse.json({ res: "success", user: u, token: token });
    } else {
      return NextResponse.json({ res: "failed", error: "Invalid Credentials" });
    }
  } else {
    return NextResponse.json({
      res: "failed",
      error: "User does not exist! Login first",
    });
  }
}
