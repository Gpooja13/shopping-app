import { NextResponse } from "next/server";
import user from "../../../../models/user";
import requireLogin from "@/middleware/requireLogin";
import connectdb from "../../../../middleware/connectdb";

export async function PUT(request, content) {
  try {
    const response = await requireLogin(request);
    if (request.userData) {
      const id = request.userData._id;
      const op = content.params.wishList;
      const wish = await request.json();

      if (op === "add") {
        var updatedWishList = await user.findByIdAndUpdate(
          id,
          {
            $push: { wishList: wish._id },
          },
          { new: true }
        )
        .populate("wishList");
      } else if (op === "sub") {
        var updatedWishList = await user.findByIdAndUpdate(
          id,
          {
            $pull: { wishList: wish._id },
          },
          { new: true }
        )
        .populate("wishList");
      }
      console.log(updatedWishList);
      if (updatedWishList) {
        const updatedList=updatedWishList.wishList;
        return NextResponse.json({ updatedList, res: "success" });
      } else {
        return NextResponse.json({ res: "failed", error: "Can't Update" });
      }
    } else {
      return response;
    }
  } catch (error) {
    return NextResponse.json({ res: "failed", error: error });
  }
}






export async function GET(request) {
  console.log("worked");
  try {
    const response = await requireLogin(request);
    if (request.userData) {
      const { _id } = request.userData;
      console.log(_id);
      const wish = (await user.findById(_id).sort({ createdAt: -1 }).populate("wishList")).wishList;
      if (wish) {
        return NextResponse.json({ res: "success", wish: wish });
      } else {
        return NextResponse.json({ res: "failed", error: error });
      }
    } else {
      return response;
    }
  } catch (error) {
    console.error("route ", error);
    return NextResponse.json(error);
  }
}
