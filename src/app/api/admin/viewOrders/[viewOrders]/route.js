export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import Order from "../../../../../models/order";
import requireLogin from "../../../../../middleware/requireLogin";
import connectdb from "../../../../../middleware/connectdb";

export async function GET(request, content) {
  try {
    const response = await requireLogin(request);
    if (request.adminData) {
      const id = content.params.viewOrders;
      const orderArray=[];
      var o = await Order.findById(id);
      
      if (o) {
        orderArray.push(o);
        return NextResponse.json({ res: "success", o: orderArray });
      } else {
        return NextResponse.json({ res: "failure", error: "Order not found." });
      }
    } else {
      return response;
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
