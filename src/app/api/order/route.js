import { NextResponse } from "next/server";
import Order from "../../../models/order";
import connectdb from "../../../middleware/connectdb";
import requireLogin from "@/middleware/middleware";

export async function GET(request) {
  await requireLogin(request);
  const { _id } = request.userData;
 
  let ord = await Order.find({ userId: _id }).sort({ createdAt: -1 });
  return NextResponse.json(ord);
}

export async function POST(request) {
  const { id } = await request.json();
  let ord = await Order.findById({ _id: id });
  return NextResponse.json(ord);
}
