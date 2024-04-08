import { NextResponse } from "next/server";
import user from "../../../models/user";
import connectdb from "../../../middleware/connectdb";
var CryptoJS = require("crypto-js");
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email } = await request.json();
    let u = await user.findOne({ email: email });
    let genOTP = Math.floor(Math.random() * 10000);
    console.log(genOTP);

    if (u) {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "oren.schmidt4@ethereal.email",
          pass: "vSNTPYw4AFDxmHM3bx",
        },
      });

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Shop Me 👻" <maddison53@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Reset Password ✔", // Subject line
        html: `<div><h2>Reset Password</h2><span>Generated OTP: ${genOTP}</span></div>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

      return NextResponse.json({ res: "success", user: u, otp: genOTP ,info:info});
    } else {
      return NextResponse.json({
        res: "failed",
        error: "User does not exist! Login first",
      });
    }
  } catch (error) {
    return NextResponse.json({
      res: "failed",
      error: error,
    });
  }
}

export async function PATCH(request) {
  const { email, password } = await request.json();
  var newPassword = CryptoJS.AES.encrypt(
    JSON.stringify(password),
    "secretkey123"
  ).toString();
  console.log(newPassword);

  let u = await user.findOneAndUpdate(
    { email: email },
    { password: newPassword },
    {
      new: true, //return modified object
    }
  );

  return NextResponse.json({ u: u, res: "Password" });
}
