"use client";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const reset = ({params}) => {
  const [disabled, setDisabled] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [matched, setMatched] = useState(0);
  const token=params.resetPassword;

  const resetPassword = async (password) => {
    console.log(password);
    try {
      if (password && token) {
        const res = await fetch("http://localhost:3000/api/resetPassword", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token:token,
            password: password,
          }),
        });
        
        const data = await res.json();
        console.log(data);
        if (data.res === "success") {
         
          toast.success("Password Changed", {
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
        toast.error("Something went wrong, try again", {
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
      <div className="container h-full px-16 pt-20">
        <div className="g-6 flex h-full flex-wrap  justify-center lg:justify-between">
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
              <h2 className="font-bold text-3xl">Reset your password</h2>
            </div>

            <div>
              <div className="relative mb-4" data-te-input-wrapper-init>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-600 block w-full p-2.5 mb-3 "
                  placeholder="*******"
                  required=""
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label
                  htmlFor="cnfPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="cnfPassword"
                  id="cnfPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-600 block w-full p-2.5 mb-3 "
                  placeholder="*******"
                  required=""
                  onChange={(e) => {
                    e.target.value;
                    if (newPassword !== e.target.value) {
                      setMatched(false);
                    } else if (newPassword === e.target.value) {
                      setMatched(true);
                    }
                  }}
                />
                {matched === true ? (
                  <p className="text-sm text-green-500">Password matched</p>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  className="inline-block w-full rounded bg-indigo-500 px-7 pb-2.5 pt-3 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-indigo-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
                  style={
                    !matched
                      ? { backgroundColor: "rgb(141 162 251)" }
                      : { backgroundColor: "rgb(104 117 245)" }
                  }
                  disabled={!matched}
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={() => resetPassword(newPassword)}
                >
                  Submit Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default reset;
