"use client";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Forgot = () => {
  const [verifyEmail, setVerifyEmail] = useState("");
  const router=useRouter();

  const sendVerificationMail = async (email) => {
    console.log(email);
    try {
      if (email) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/resetPassword`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
          }),
        });
        8;
        const data = await res.json();
        console.log(data);
        if (data.res === "success") {
          setVerifyEmail("");
          router.push("/login")
          toast.success("Email sent", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: "Bounce",
          });
        } else if (data.res === "failed") {
          toast.error(data.error, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: "Bounce",
          });
        }
      } else {
        toast.error("Enter valid email", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: "Bounce",
        });
      }
    } catch (error) {
      console.log("Error in client side: ", error);
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: "Bounce",
      });
    }
  };

  return (
    <section className="h-screen ">
      <div className="container h-full px-16 pt-20 ">
        <div className="g-6 flex h-full flex-wrap justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <div className="md:flex lg:flex justify-center items-center hidden m-5">
              <Image
                className=""
                src="/logo.webp"
                alt="logo"
                width={80}
                height={80}
              />
              <h2 className="font-bold text-3xl">Forgot your password</h2>
            </div>

            <div>
              <div className="relative mb-4" data-te-input-wrapper-init>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Enter your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={verifyEmail}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-600 block w-full p-2.5  "
                  placeholder="name@company.com"
                  required=""
                  onChange={(e) => setVerifyEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="inline-block w-full rounded bg-indigo-500 px-7 pb-2.5 pt-3 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-indigo-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={() => sendVerificationMail(verifyEmail)}
                >
                  Send email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forgot;
