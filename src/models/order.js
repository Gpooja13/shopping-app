const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name:{ type: String, required: true },
    pincode:{ type: String, required: true },
    address: { type: String, required: true },
    phone:{ type: String, required: true },
    email:{ type: String, required: true },
    products:{type:Object, required:true},
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
    payment: {
      razorpay_order_id: {
        type: String,
        required: true,
      },
      razorpay_payment_id: {
        type: String,
        required: true,
      },
      razorpay_signature: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Order", orderSchema);
