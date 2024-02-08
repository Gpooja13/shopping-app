"use client";
import { createContext, useContext, useState } from "react";
// import { useRouter } from 'next/navigation'

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    for (let i = 0; i < Object.keys(myCart).length; i++) {
      const itemCode = Object.keys(myCart)[i];
      subt += myCart[itemCode].price * myCart[itemCode].qty;
    }
    setSubTotal(subt);
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
    let myCart = { itemCode: { qty: 1, price, name, size, variant } };

    setCart(myCart);
    saveCart(myCart);
  };

  const clear = () => {
    setCart({});
    saveCart({});
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        subTotal,
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
