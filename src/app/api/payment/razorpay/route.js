import { NextResponse } from "next/server";
import Razorpay from "razorpay";
// import shortid from "shortid"; //deprecated
import { nanoid } from 'nanoid'
import product from "../../../../models/product";
import connectdb from "../../../../middleware/connectdb";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export async function POST(req) {
  const payload = await req.json();
  const { products } = payload;
  let sumTotal = 0;
  let productOne = 0;
  for (const item in products) {
    sumTotal += products[item].price * products[item].qty;

    productOne = await product.findOne({ slug: item });
    if (products[item].price !== productOne.price) {
      return NextResponse.json({ res: "failed", clearCart:true, error:"Price has been changed. Try again!" });
    }
  }

  if (sumTotal !== payload.amount) {
    return NextResponse.json({ res: "failed", clearCart:true ,error:"Price has been changed. Try again!" });
  }

  // const payment_capture = 1;
  const amount = payload.amount * 100; // amount in paisa. In our case it's INR 1
  const currency = "INR";
  const options = {
    amount: amount.toString(),
    currency,
    // receipt: shortid.generate(),
    receipt: nanoid(),
    // payment_capture,
    notes: {
      // These notes will be added to your transaction. So you can search it within their dashboard.
      // Also, it's included in webhooks as well. So you can automate it.
      paymentFor: "testingDemo",
      userId: "100",
      productId: "A100",
    },
  };

  const order = await instance.orders.create(options);
  return NextResponse.json({ res: "success", order:order });
}
