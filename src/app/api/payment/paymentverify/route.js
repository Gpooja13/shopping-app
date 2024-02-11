import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import crypto from "crypto";
import Order from "../../../../models/order";
import connectdb from "../../../../middleware/connectdb"
// import Payment from "../../../database/model/Payment"
// import dbConnect from '../../../database/database'
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

export async function POST(req, res) {
  const {
    userId,
    products,
    address,
    amount,
    status,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = await req.json();
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  console.log("id==", body);

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // console.log(Order);

    // await dbConnect();

    // await Order.create({
    //   // userId,
    //   // products,
    //   // address,
    //   // amount,
    //   // status,
    //   razorpay_order_id,
    //   razorpay_payment_id,
    //   razorpay_signature,
    // });

    let o = new Order({
      userId,
      products,
      address,
      amount,
      status,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    await o.save();

    return NextResponse.redirect(new URL("/paymentsuccess", req.url));
  } else {
    return NextResponse.json(
      {
        message: "fail",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      message: "success",
    },
    {
      status: 200,
    }
  );
}
