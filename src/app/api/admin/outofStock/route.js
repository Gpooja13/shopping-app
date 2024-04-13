import { NextResponse } from "next/server";
import product from "../../../../models/product";
import requireLogin from "@/middleware/requireLogin";
import connectdb from "../../../../middleware/connectdb";

export async function GET() {
  const response = await requireLogin(request);
  if (request.adminData) {
    let products = await product.find({ availableQty: "0" });
    if (products) {
      return NextResponse.json(products);
    } else {
      return NextResponse.json({ error: "error" });
    }
  } else {
    return response;
  }
}
