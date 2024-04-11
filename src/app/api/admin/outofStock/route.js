import { NextResponse } from "next/server";
import product from "../../../../models/product";
import connectdb from "../../../../middleware/connectdb";

export async function GET() {
  let products = await product.find({ availableQty: "0" });
  if (products) {
    return NextResponse.json(products);
  }
  else{
    return NextResponse.json({error:"error"});
  }
}
