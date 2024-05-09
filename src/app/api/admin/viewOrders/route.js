export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import Order from "../../../../models/order";
import requireLogin from "@/middleware/requireLogin";
import connectdb from "../../../../middleware/connectdb";

export async function GET(request, content) {
  try {
    const response = await requireLogin(request);

    if (request.adminData) {
      var o = await Order.find().sort({ createdAt: -1 });
      var recentOrders=await Order.find().sort({ createdAt: -1 }).limit(10);

      let ordersByMonth = {};

      for (let order of o) {
        const month = new Date(order.createdAt).toLocaleString("default", {
          month: "long",
        }); // Get month name

        if (!ordersByMonth[month]) {
          ordersByMonth[month] = { sales: 0, count: 0 };
        }
        ordersByMonth[month].sales += order.amount;
        ordersByMonth[month].count++;
      }

      let ordersByGender = {};

      for (let item of o) {
        const products = item.products;
        const product = Object.values(products);
        for (let p of product) {
          const gender = p.qty;
          if (!ordersByGender[gender]) {
            ordersByGender[gender] = { count: 0 };
          }

          ordersByGender[gender].count++;
        }
      }

      if (o) {
        return NextResponse.json({
          res: "success",
          o: recentOrders,
          ordersByMonth: ordersByMonth,
          ordersByGender: ordersByGender,
        });
      } else {
        return response;
      }
    }
    return NextResponse.json({ res: "failed", error: "Not Authorized" });
  } catch (error) {
    return NextResponse.json(error);
  }
}
