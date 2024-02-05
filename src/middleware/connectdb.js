// const connectDB=async(handler)=>{
//     if(mongoose.connections[0].readyState){
// console.log("MongoDB already connected");
//         return handler(req,res)
//     }
//     await mongoose.connect(process.env.MONGO_URI);
// console.log("MongoDB connected successfully");
//     return handler(req,res);
// }

// export default connectDB;

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
