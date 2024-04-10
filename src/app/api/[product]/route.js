import { NextResponse } from "next/server";
import product from "../../../models/product";
import connectdb from "../../../middleware/connectdb";

export async function GET(request, content) {
  const gender = content.params.product;

  let products = await product.find({$and: [{ gender: gender },{availableQty: {$not: {$eq: 0}}}]});

  let allProduct = {};
  for (let item of products) {
    if (item.title in allProduct) {
      // if (
      //   !tshirt[item.title].color.includes(item.color) &&
      //   item.availableQty > 0
      // ) {
      //   tshirt[item.title].color.push(item.color);
      // }
      if (!allProduct[item.title].size.includes(item.size) && item.availableQty > 0) {
        allProduct[item.title].size.push(item.size);
      }
    } else {
      allProduct[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        // tshirt[item.title].color = [item.color];
        allProduct[item.title].size = [item.size];
      }
    }
  }
  return NextResponse.json(allProduct);

}



export async function POST(request) {
  const payload = await request.json();
  let p = new product({
    title: payload.title,
    slug: payload.slug,
    desc: payload.desc,
    image: payload.image,
    category: payload.category,
    gender: payload.category,
    size: payload.size,
    color: payload.color,
    price: payload.price,
    availableQty: payload.availableQty,
  });
  await p.save();

  return NextResponse.json({ res: "success" });
}



export async function PUT(request, content) {
  try {
    const id = content.params.product;
  const changes = await request.json();

  let p = await product.findByIdAndUpdate(
    id,
    {
      title: changes.title,
      slug: changes.slug,
      desc: changes.desc,
      image: changes.image,
      category: changes.category,
      gender:changes.gender,
      size: changes.size,
      color: changes.color,
      price: changes.price,
      availableQty: changes.availableQty,
    },
    {
      new: true,
    }
  );
  if(p){
    return NextResponse.json({ p, res: "success" });
  }
  else{
    return NextResponse.json({ res: "failed", error:"Can't fetch" });
  }
  } catch (error) {
    return NextResponse.json({ res: "failed", error:error });
  }
  
}



export async function PATCH(request) {
  const {products} = await request.json();
  console.log(products);

  for (const item in products) {
    let p;
    let num=0;
    num=products[item].availableQty-products[item].qty;
     p = await product.findOneAndUpdate({ slug: item },{availableQty:num}, {
      new: true, //return modified object
    });
  }

  return NextResponse.json({res: "success" });
}
