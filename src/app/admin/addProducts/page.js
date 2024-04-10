"use client";
import React, {useState} from "react";
import { Label, Select, TextInput, Textarea, FileInput } from "flowbite-react";

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

  const handleChange = async (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "category") {
      setCategory(e.target.value);
    }
    if (e.target.name === "gender") {
      setGender(e.target.value);
    }
    if (e.target.name === "description") {
      setDesc(e.target.value);
    }
    if (e.target.name === "size") {
      setSize(e.target.value);
    }
    if (e.target.name === "color") {
      setColor(e.target.value);
    }
    if (e.target.name === "price") {
      setPrice(e.target.value);
    }
    if (e.target.name === "quantity") {
      setQuantity(e.target.value);
    }
    if (e.target.name === "image") {
      setImage(e.target.value);
    }



    //   if (e.target.value.length == 6) {
    //     const fetchApi = await fetch("http://localhost:3000/api/pincode");
    //     const data = await fetchApi.json();
    // setUserId(user?._id);
  };


  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-8 md:px-5 lg:px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Add Products
          </h1>
          <h2 className="font-bold text-lg">Product Details</h2>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify.
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title" />
                </div>
                <TextInput id="title" name="title" type="text" sizing="md" required />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="category" value="Category" />
                </div>
                <TextInput id="category" name="category" type="text" sizing="md" required/>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="gender" value="Type" />
                </div>
                <Select id="gender" required name="gender">
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
                <Select id="size" required name="size">
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
                  <Label htmlFor="description" value="Your message" />
                </div>
                <Textarea
                  id="description"
                  required
                  rows={3}
                  name="description"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="color" value="Color" />
                </div>
                <TextInput id="color" type="text" sizing="md" name="color" required/>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="quantity" value="Quantity" />
                </div>
                <TextInput id="quantity" type="text" sizing="md" name="quantity" required/>
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
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Price ₹" />
                </div>
                <TextInput id="price" type="text" sizing="md" name="price" required/>
              </div>
            </div>
          </div>
          <div className="p-2 w-full">
            <button className="flex mx-auto my-6 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-md">
              Upload
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
