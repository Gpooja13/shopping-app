import { NextResponse } from "next/server";
import product from "../../../models/product";

export async function PUT(request, content) {
  const id = content.params.updateProduct;
  console.log(id);
  const changes = await request.json();
  console.log(changes.title);

  let p = await product.findByIdAndUpdate(
    id,
    { title: changes.title,slug:changes.slug,desc:changes.desc,image:changes.image,category:changes.category,size:changes.size,color:changes.color,price:changes.price,availableQty:changes.availableQty },
    {
      new: true,
    }
  );

  return NextResponse.json({ p, res: "success" });
}
