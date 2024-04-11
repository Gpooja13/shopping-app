import { NextResponse } from "next/server";
import product from "../../../../models/product";
import connectdb from "../../../../middleware/connectdb";

export async function GET(request, content) {
    const gender = content.params.viewProduct;
    let products = await product.find({ gender: gender });
    return NextResponse.json(products);
  }

  export async function POST(request) {
    const payload = await request.json();
    let slugWord=nanoid(7);
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
    if(p){
      return NextResponse.json({ res: "success",p:p });
    }
    return NextResponse.json({ res: "failure",error:"Error in posting info"});
  }
  
  
  
  export async function PUT(request, content) {
    try {
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