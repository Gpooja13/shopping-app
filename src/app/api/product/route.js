import { NextResponse } from "next/server";
import product from "../../../models/product";
import connectDB from "../../../middleware/connectdb";

export async function GET() {
  let products = await product.find({category:"mug"});
  return NextResponse.json(products);
}

export async function POST(request) {
  const payload = await request.json();
  let p = new product({
            title: payload.title,
            slug: payload.slug,
            desc: payload.desc,
            image: payload.image,
            category: payload.category,
            size: payload.size,
            color: payload.color,
            price: payload.price,
            availableQty: payload.availableQty,
          });
          await p.save();

  return NextResponse.json({ res:"success" })
}





