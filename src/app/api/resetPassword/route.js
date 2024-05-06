import { NextResponse } from "next/server";
import user from "../../../models/user";
import connectdb from "../../../middleware/connectdb";
var CryptoJS = require("crypto-js");
import nodemailer from "nodemailer";
var jwt = require("jsonwebtoken");

export async function POST(request) {
  try {
    const { email } = await request.json();
    let u = await user.findOne({ email: email });

    if (u) {
      var token = jwt.sign({ email: u.email, name: u.name }, "jwtSecret", {
        expiresIn: "1d",
      });

      var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "91a92acf060d12",
          pass: "0a7517b0b5ee9b",
        },
      });

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Shop Me 👻" <maddison53@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Reset Password ✔", // Subject line
        html: `<div><h2>Reset Password</h2><span>Generated URL :<a href="${process.env.NEXT_PUBLIC_HOST}/forgotPassword/${token}">Click here to reset Password</a> </span></div>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

      return NextResponse.json({ res: "success", info: info });
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
  try {
    const { token, password } = await request.json();
    const payload = await jwt.verify(token, "jwtSecret");
    console.log(payload);

    if (!payload) {
      return NextResponse.json({
        res: "failed",
        error: "Error with token",
      });
    } else {
      var newPassword = CryptoJS.AES.encrypt(
        JSON.stringify(password),
        "secretkey123"
      ).toString();

      let u = await user.findOneAndUpdate(
        { email: payload.email },
        { password: newPassword },
        {
          new: true, //return modified object
        }
      );
      return NextResponse.json({ res: "success" });
    }

   
  } catch (error) {
    console.log(error);
    return NextResponse.json({res:"failed", error: error });
  }
}
