const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Product = require("../models/product");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wishList:[{type: ObjectId, ref: "Product"}],
    admin:{ type: String},
    // dp: { type: String },
  },
  { timestamps: true }
);

mongoose.models={}
// export default mongoose.models.product || mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);
