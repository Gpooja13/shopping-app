import { NextResponse } from "next/server";
import product from "../../../models/product";
import connectdb from "../../../middleware/connectdb";

export async function GET(request, content) {
  const gender = content.params.product;

  let products = await product.find({$and: [{ gender: gender },{availableQty: {$not: {$eq: 0}}}]});
  if(!products){
    return NextResponse.json({res: "failed",error:"Can't fetch" }); 
  }

  let allProduct = {};
  for (let item of products) {
    if (item.title in allProduct) {
      
      if (!allProduct[item.title].size.includes(item.size) && item.availableQty > 0) {
        allProduct[item.title].size.push(item.size);
      }
    } else {
      allProduct[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        allProduct[item.title].size = [item.size];
      }
    }
  }
  return NextResponse.json(allProduct);
}


export async function PATCH(request) {
  const {products} = await request.json();

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
