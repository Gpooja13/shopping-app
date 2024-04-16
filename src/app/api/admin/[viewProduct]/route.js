import { NextResponse } from "next/server";
import product from "../../../../models/product";
import requireLogin from "@/middleware/requireLogin";
import connectdb from "../../../../middleware/connectdb";
import { nanoid } from "nanoid";

export async function GET(request, content) {
  const response = await requireLogin(request);
  if (request.adminData) {
    const gender = content.params.viewProduct;
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    const skip = searchParams.get("skip");
    console.log(limit, skip);
    console.log(searchParams, limit, skip);
    if (gender === "outofStock") {
      var num = await product.find({ availableQty: "0" }).count();
      var products = await product
        .find({ availableQty: "0" })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
    } else {
      var num = await product.find({ gender: gender }).count();
      var products = await product
        .find({ gender: gender })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
    }
    console.log(products);
    if (products) {
      return NextResponse.json({ products, num });
    } else {
      return NextResponse.json({ error: "error" });
    }
  } else {
    return response;
  }
}

export async function POST(request) {
  const response = await requireLogin(request);
  if (request.adminData) {
    const payload = await request.json();
    let slugWord = nanoid(7);
    let p = new product({
      title: payload.title,
      slug: slugWord,
      desc: payload.desc,
      image: payload.image,
      category: payload.category,
      gender: payload.gender,
      size: payload.size,
      color: payload.color,
      price: payload.price,
      availableQty: payload.availableQty,
    });
    await p.save();
    if (p) {
      return NextResponse.json({ res: "success", p: p });
    }
    return NextResponse.json({
      res: "failed",
      error: "Error in posting info",
    });
  } else {
    return response;
  }
}

export async function PUT(request, content) {
  try {
    const response = await requireLogin(request);
    if (request.adminData) {
      const id = content.params.viewProduct;
      const changes = await request.json();

      let p = await product.findByIdAndUpdate(
        id,
        {
          title: changes.title,
          slug: changes.slug,
          desc: changes.desc,
          image: changes.image,
          category: changes.category,
          gender: changes.gender,
          size: changes.size,
          color: changes.color,
          price: changes.price,
          availableQty: changes.availableQty,
        },
        {
          new: true,
        }
      );
      if (p) {
        return NextResponse.json({ p, res: "success" });
      } else {
        return NextResponse.json({ res: "failed", error: "Can't fetch" });
      }
    } else {
      return response;
    }
  } catch (error) {
    return NextResponse.json({ res: "failed", error: error });
  }
}

export async function DELETE(request, content) {
  try {
    const response = await requireLogin(request);
    if (request.adminData) {
      const id = content.params.viewProduct;

      let p = await product.deleteOne({_id: id });
      if (p) {
        return NextResponse.json({ res: "success" });
      } else {
        return NextResponse.json({ res: "failed", error: "Can't delete" });
      }
    } else {
      return response;
    }
  } catch (error) {
    return NextResponse.json({ res: "failed", error: error });
  }
}
