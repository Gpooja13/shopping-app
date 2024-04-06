"use client";
import { Suspense } from "react";
import Buy from "./Buy";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useGlobalContext } from "../../Context/store";

const BuyProduct = ({
  userId,
  totalAmount,
  products,
  name,
  email,
  phone,
  address,
  pincode,
  disabled,
}) => {
  const router = useRouter();
  const {
    clear,
  } = useGlobalContext();

  const makePayment = async ({ products }) => {
    // "use server"
    const key = process.env.RAZORPAY_API_KEY;
    console.log(key);
    // Make API call to the serverless API
    const data = await fetch("http://localhost:3000/api/payment/razorpay", {
      method: "POST",
      // headers: {
      //   // Authorization: 'YOUR_AUTH_HERE'
      // },
      body: JSON.stringify({
        amount: totalAmount,
        products:products
      }),
    });
    const {msg, order} = await data.json();
    if(msg==="success"){
    
    const options = {
      key: key,
      name: "Shoppers",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: "Shoppers-Payment Portal",
      // image: logoBase64,
      handler: async function (response) {
        // if (response.length==0) return <Loading/>;

        const data = await fetch(
          "http://localhost:3000/api/payment/paymentverify",
          {
            method: "POST",
            // headers: {
            //   // Authorization: 'YOUR_AUTH_HERE'
            // },
            body: JSON.stringify({
              userId: userId,
              products: products,
              amount: order.amount,
              status: "Paid",
              name: name,
              email: email,
              phone: phone,
              address: address,
              pincode: pincode,

              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          }
        );

        const res = await data.json();
        console.log("response verify==", res);
        console.log(userId);

        if (res?.message == "success") {
          console.log("redirected.......");
          router.push("/order?orderid=" + res._id);
          clear();
        }

        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "Pooja Gupta",
        email: "believix13@gmail.com",
        contact: "8299552682",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
    });}
    else{
      console.log("Cart has been tampered.Try again");
    }
  };


  return (
    <>
      <Suspense fallback={<Loading />}>
        <Buy
          makePayment={makePayment}
          totalAmount={totalAmount}
          disabled={disabled}
          products={products}
        />
      </Suspense>
    </>
  );
};

export default BuyProduct;
