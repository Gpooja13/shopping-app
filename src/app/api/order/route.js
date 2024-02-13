import { NextResponse } from "next/server";
import Order from "../../../models/order";
import connectdb from "../../../middleware/connectdb";

export async function GET() {
  let ord = await Order.find().sort({createdAt:-1});
  return NextResponse.json(ord);
}

export async function POST(request) {
  const { id } = await request.json();
  let ord = await Order.findById({ _id: id });
  return NextResponse.json(ord);
}
