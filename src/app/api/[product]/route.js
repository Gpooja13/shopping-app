import { NextResponse } from "next/server";
import product from "../../../models/product";
import connectdb from "../../../middleware/connectdb";

export async function GET(request, content) {
  const category = content.params.product;
  let products = await product.find({ category: category });

  let tshirt = {};
  for (let item of products) {
    if (item.title in tshirt) {
      if (
        !tshirt[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirt[item.title].color.push(item.color);
      }
      if (
        !tshirt[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirt[item.size].color.push(item.size);
      }
    } else {
      tshirt[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirt[item.title].color = [item.color];
        tshirt[item.title].size = [item.size];
      }
    }
  }
  return NextResponse.json(tshirt);
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

  return NextResponse.json({ res: "success" });
}

export async function PUT(request, content) {
  const id = content.params.product;
  console.log(id);
  const changes = await request.json();
  console.log(changes.title);

  let p = await product.findByIdAndUpdate(
    id,
    {
      title: changes.title,
      slug: changes.slug,
      desc: changes.desc,
      image: changes.image,
      category: changes.category,
      size: changes.size,
      color: changes.color,
      price: changes.price,
      availableQty: changes.availableQty,
    },
    {
      new: true,
    }
  );

  return NextResponse.json({ p, res: "success" });
}
