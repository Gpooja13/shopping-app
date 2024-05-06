import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../../../../models/order";
import connectdb from "../../../../middleware/connectdb";
// import Payment from "../../../database/model/Payment"
// import dbConnect from '../../../database/database'
import requireLogin from "@/middleware/requireLogin";
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

export async function POST(req, res) {
  // const response = await requireLogin(request);
  // if (request.userData) {
    const {
      userId,
      products,
      address,
      amount,
      status,
      name,
      email,
      phone,
      pincode,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("id==", body);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    console.log(isAuthentic);
    if (isAuthentic) {
      let o = new Order({
        userId,
        products,
        address,
        amount: amount / 100,
        status,
        name,
        email,
        phone,
        pincode,
        payment: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
      });
      await o.save();

      return NextResponse.json(
        {
          res: "success",
          _id: o._id,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          res: "failed",
          error: "Error in server side",
        },
        {
          status: 400,
        }
      );
    }
  // } 
  // else {
  //   return response;
  // }
}
