"use client";
import { createContext, useContext, useState } from "react";
// import { useRouter } from 'next/navigation'

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [numOfItems, setNumOfItems] = useState(0);
  const [wishItems, setWishItems] = useState([]);
  const [included, setIncluded] = useState(false);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let num = 0;
    let p;
    let list = [];
    for (let i = 0; i < Object.keys(myCart).length; i++) {
      const itemCode = Object.keys(myCart)[i];
      subt += myCart[itemCode].price * myCart[itemCode].qty;
      num += myCart[itemCode].qty;
      // p = { productId: myCart[itemCode].slug, quantity: myCart[itemCode].qty };
      // list.push(p);
    }

    setSubTotal(subt);
    setNumOfItems(num);
    // setItem(list)
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let myCart = { ...cart };
    if (itemCode in myCart) {
      myCart[itemCode].qty += qty;
    } else {
      myCart[itemCode] = { qty: 1, price, name, size, variant };
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

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let myCart = {};
    myCart[itemCode] = { qty: 1, price, name, size, variant };

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
      console.log(newArray);
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

  return (
    <GlobalContext.Provider
      value={{
        // item,
        // setItem,
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
