"use client";
import { Suspense } from "react";
import Buy from "./Buy";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useGlobalContext } from "../../context/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  
  const { clear } = useGlobalContext();

  const makePayment = async ({ products }) => {
    try {
      const key = process.env.RAZORPAY_API_KEY;
      console.log(key);

      const token = JSON.parse(localStorage.getItem("token"))?.token;

      const data = await fetch("http://localhost:3000/api/payment/razorpay", {
        method: "POST",
        // headers: {
        //   // Authorization: 'YOUR_AUTH_HERE'
        // },
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: "Bearer " + token,
        // },
        body: JSON.stringify({
          amount: totalAmount,
          products: products,
        }),
      });
      const { res, order } = await data.json();
      if (res === "success") {
        const options = {
          key: key,
          name: "ShopMe",
          currency: order.currency,
          amount: order.amount,
          order_id: order.id,
          description: "Shoppers-Payment Portal",
          // image: logoBase64,
          handler: async function (response) {
            const data = await fetch(
              "http://localhost:3000/api/payment/paymentverify",
              {
                method: "POST",
                // headers: {
                //   // Authorization: 'YOUR_AUTH_HERE'
                // },
                // headers: {
                //   "Content-Type": "application/json",
                //   Authorization: "Bearer " + token,
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

            if (res?.res == "success") {
              try {
                const update = await fetch(
                  "http://localhost:3000/api/product",
                  {
                    method: "PATCH",
                    // headers: {
                    //   // Authorization: 'YOUR_AUTH_HERE'
                    // },
                    body: JSON.stringify({
                      products,
                    }),
                  }
                );
                const updateRes = await update.json();
                if (updateRes.res === "success") {
                  toast.success("Order placed!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  console.log(updateRes);
                  console.log("success");
                  console.log("redirected.......");
                  router.push("/auth/order?orderid=" + res._id);
                  clear();
                } else if (updateRes.res === "failed") {
                  toast.error(updateRes.error, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  console.log("error in client page", updateRes.error);
                } else {
                  console.log("error in client page", updateRes.error);
                }
              } catch (error) {
                console.log("Can't upadate database", error);
              }
            } else if (res?.res == "failed") {
              toast.error(res.error, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              toast.error("Some error happened, Try Again!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
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
        });
      }
      if (res === "failed") {
        toast.error("Price has been changed. Try again!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        clear();
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Client side error", error);
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
