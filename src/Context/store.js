"use client";
import { createContext, useContext, useState } from "react";
// import { useRouter } from 'next/navigation'

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [numOfItems, setNumOfItems] = useState(0);
  const [wishItems, setWishItems] = useState([]);
  const [included, setIncluded] = useState(false);
  const [sort, setSort] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let num = 0;

    for (let i = 0; i < Object.keys(myCart).length; i++) {
      const itemCode = Object.keys(myCart)[i];
      subt += myCart[itemCode].price * myCart[itemCode].qty;
      num += myCart[itemCode].qty;
    }

    setSubTotal(subt);
    setNumOfItems(num);
  };

  const addToCart = (
    itemCode,
    qty,
    price,
    name,
    size,
    variant,
    availableQty
  ) => {
    let myCart = { ...cart };
    if (itemCode in myCart) {
      myCart[itemCode].qty += qty;
    } else {
      myCart[itemCode] = { qty: 1, price, name, size, variant, availableQty };
    }
    setCart(myCart);
    saveCart(myCart);
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let myCart = { ...cart };
    if (itemCode in myCart) {
      myCart[itemCode].qty -= qty;
    }
    if (myCart[itemCode] && myCart[itemCode].qty <= 0) {
      delete myCart[itemCode];
    }
    setCart(myCart);
    saveCart(myCart);
  };

  const buyNow = (itemCode, qty, price, name, size, variant, availableQty) => {
    let myCart = {};
    myCart[itemCode] = { qty: 1, price, name, size, variant, availableQty };

    setCart(myCart);
    saveCart(myCart);
  };

  const clear = () => {
    setCart({});
    saveCart({});
  };

  const addToWishList = (product) => {
    const exists = wishItems.some((elem) => elem.title === product.title);
    if (exists) {
      const newArray = wishItems.filter((item) => item !== product);
      localStorage.setItem("wishList", JSON.stringify(newArray));
      setWishItems(newArray);
      setIncluded(false);
      console.log("remove");
    } else {
      wishItems.push(product);
      localStorage.setItem("wishList", JSON.stringify(wishItems));
      setIncluded(true);
      console.log("added");
    }
  };

  const sorting = (data, sortType) => {
    if (sortType === "highest-lowest") {
      const sortedData = Object.fromEntries(
        Object.entries(data).sort(([, a], [, b]) => a.price - b.price)
      );
      return sortedData;
    }
    if (sortType === "lowest-highest") {
      const sortedData = Object.fromEntries(
        Object.entries(data).sort(([, a], [, b]) => b.price - a.price)
      );
      return sortedData;
    }
    if (sortType === "default") {
      return data;
    }
  };

  const uniqueData = (data, property) => {
    let newVal = Object.keys(data).map((curElem) => {
      if (property === "category") {
        return data[curElem].category;
      }
      if (property === "color") {
        return data[curElem].color;
      }
      if (property === "brand") {
        return data[curElem].brand;
      }
      if (property === "price") {
        return data[curElem].price;
      }
    });
    property === "price"
      ? (newVal = [...new Set(newVal)])
      : (newVal = ["All", ...new Set(newVal)]);
    return newVal;
  };

  const filtering = (data, category, color, price) => {
    if (category) {
      if (category === "All") {
        return data;
      }
      data = Object.fromEntries(
        Object.entries(data).filter(
          ([key, value]) => value.category === category
        )
      );
    }
    if (color) {
      if (color === "All") {
        return data;
      }
      data = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value.color === color)
      );
    }
    if (price) {
      data = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value.price <= price)
      );
    }
    console.log("newData", data);
    return data;
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        saveCart,
        subTotal,
        numOfItems,
        wishItems,
        addToWishList,
        included,
        setIncluded,
        setWishItems,
        setSubTotal,
        addToCart,
        removeFromCart,
        buyNow,
        clear,
        sorting,
        sort,
        setSort,
        uniqueData,
        selectedColor,
        setSelectedColor,
        selectedCategory,
        setSelectedCategory,
        selectedPrice,
        setSelectedPrice,
        filtering,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
