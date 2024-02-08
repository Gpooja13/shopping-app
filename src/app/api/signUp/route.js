import { NextResponse } from "next/server";
import user from "../../../models/user";
import connectdb from "../../../middleware/connectdb";
var CryptoJS = require("crypto-js");

export async function POST(request) {
  const payload = await request.json();
  var password = CryptoJS.AES.encrypt(
    JSON.stringify(payload.password),
    "secretkey123"
  ).toString();

  let u = new user({
    name: payload.name,
    email: payload.email,
    password: password,
  });
  await u.save();

  return NextResponse.json({ res: "success", u });
}
