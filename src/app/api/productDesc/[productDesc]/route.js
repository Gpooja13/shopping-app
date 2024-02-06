import { NextResponse } from "next/server";
import product from "../../../../models/product";
import connectdb from "../../../../middleware/connectdb";

export async function GET(request, content) {
  const slugID = content.params.productDesc;
  let productOne = await product.findOne({ slug: slugID });
  let variants = await product.find({ title: productOne.title });

  let colorSizeSlug = {}; //{red:{xl:{slug:'wear-tshirt'}}}

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }
  return NextResponse.json({
    slug:slugID,
    productOne: productOne,
    variant: colorSizeSlug,
    msg: "success",
  });
}
