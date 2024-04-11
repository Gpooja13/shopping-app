"use client";
import React, { useState, useEffect } from "react";
import { Label, Select, TextInput, Textarea, FileInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const p = useSearchParams();
  const id=p.get("id");
  const slug=p.get("slug");
  const router=useRouter();

  const submitData = async () => {
    console.log("pressed");
    if ((title, category, size, color, price, desc, quantity, image, gender,id)) {
      const fetchApi = await fetch(
        `http://localhost:3000/api/admin/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            slug:slug,
            desc: desc,
            image: image,
            category: category,
            gender: gender,
            size: size,
            color: color,
            price: price,
            availableQty: quantity,
          }),
        }
      );
      const data = await fetchApi.json();
   
      if (data.res === "success") {
        toast.success("Product has been added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: "",
          theme: "light",
          // transition:"Bounce"
        });
        router.push("/admin/viewProducts");
      } else if (data.res === "failure") {
        toast.success(data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: "",
          theme: "light",
          // transition:"Bounce"
        });
      }
    } else {
      toast.error("Fill all the details", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: "",
        theme: "light",
        // transition:"Bounce"
      });
    }
  };

  useEffect(() => {
    setTitle(p.get("title"));
    setGender(p.get("gender"));
    setCategory(p.get("category"));
    setColor(p.get("color"));
    setSize(p.get("size"));
    setQuantity(p.get("availableQty"));
    setPrice(p.get("price"));
    setDesc(p.get("desc"));
    setImage(p.get("image"));
  }, []);

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-8 md:px-5 lg:px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Edit Products
          </h1>
         
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title" />
                </div>
                <TextInput
                  id="title"
                  name="title"
                  type="text"
                  sizing="md"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="category" value="Category" />
                </div>
                <TextInput
                  id="category"
                  name="category"
                  type="text"
                  sizing="md"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="gender" value="Type" />
                </div>
                <Select
                  id="gender"
                  required
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Men</option>
                  <option>Women</option>
                  <option>Kids</option>
                  <option>Accessories</option>
                </Select>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="size" value="Size" />
                </div>
                <Select
                  id="size"
                  required
                  name="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </Select>
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="max-w-full">
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Description" />
                </div>
                <Textarea
                  id="description"
                  required
                  rows={3}
                  name="description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="color" value="Color" />
                </div>
                <TextInput
                  id="color"
                  type="text"
                  sizing="md"
                  name="color"
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="quantity" value="Quantity" />
                </div>
                <TextInput
                  id="quantity"
                  type="text"
                  sizing="md"
                  name="quantity"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div id="fileUpload" className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Upload file" />
                </div>
                <FileInput
                  id="file"
                  helperText="Upload Picture of 64base"
                  name="image"
                  required
                //   value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Price ₹" />
                </div>
                <TextInput
                  id="price"
                  type="text"
                  sizing="md"
                  name="price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="p-2 w-full">
            <button
              className="flex mx-auto my-6 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-md"
              onClick={() => submitData()}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
