import { NextResponse } from "next/server";
import product from "../../../../models/product";
import connectdb from "../../../../middleware/connectdb";

export async function GET(request, content) {
  const slugID = content.params.productDesc;
  let productOne = await product.findOne({ slug: slugID });
  let variants = await product.find({
    title: productOne?.title,
    category: productOne?.category,
  // const titleID = content.params.productDesc;
  // let productOne = await product.findOne({ title:titleID });
  // let variants = await product.find({
  //   title: productOne.title,
  //   category: productOne.category,

  });

  let sizeSlug = {}; //{title:{s:{slug:'wearTshirt'},{m:{slug:'xyz'}}}}   //{red:{xl:{slug:'wear-tshirt'}}}

  // for (let item of variants) {
  //   if (Object.keys(colorSizeSlug)?.includes(item.color)) {
  //     colorSizeSlug[item.color][item.size] = { slug: item.slug };
  //   } else {
  //     colorSizeSlug[item.color] = {};
  //     colorSizeSlug[item.color][item.size] = { slug: item.slug };
  //   }
  // }

  for (let item of variants) {
    if (Object.keys(sizeSlug).includes(item.size)) {
      sizeSlug[item.size] = { slug: item.slug };
    } else {
      sizeSlug[item.size] = {};
      sizeSlug[item.size] = { slug: item.slug };
    }
  }
  console.log(productOne);
  console.log(sizeSlug);

  return NextResponse.json({
    slug: slugID,
    productOne: productOne,
    variant: sizeSlug,
    msg: "success",
  });
}
