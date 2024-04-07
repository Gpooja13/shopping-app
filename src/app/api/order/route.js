import { NextResponse } from "next/server";
import Order from "../../../models/order";
import connectdb from "../../../middleware/connectdb";
import requireLogin from "@/middleware/requireLogin";

export async function GET(request) {
  try {
    const response = await requireLogin(request);
    if (request.userData) {
      const { _id } = request.userData;
      let ord = await Order.find({ userId: _id }).sort({ createdAt: -1 });
      return NextResponse.json(ord);
    } else {
      return response;
    }
  } catch (error) {
    console.error("route ", error);
    return NextResponse.json(error);
  }
}

export async function POST(request) {
  try {
    const response = await requireLogin(request);
    const { id } = await request.json();
    if (id) {
      let ord = await Order.findById({ _id: id });
      return NextResponse.json(ord);
    } else {
      return response;
    }
  } catch (error) {
    console.error("route ", error);
    return NextResponse.json(error);
  }
}
