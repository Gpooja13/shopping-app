import { NextResponse } from "next/server";
import Order from "../../../../models/order";
import connectdb from "../../../../middleware/connectdb";

export async function GET() {
  try {
      let o = await Order.find().sort({ createdAt: -1 });
      console.log(o);
      const order={};
      
      if(o){
        return NextResponse.json({res:"success",o:o});
      }
     else {
        return NextResponse.json({res:"failed",error:"error"});
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

