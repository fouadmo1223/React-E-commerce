import { createContext, use, useEffect, useState } from "react";

export const CartLengthContext = createContext(null); 

export default function CartLengthContextProvider  ({ children })  {
    const [cartLength, setCartLength] = useState(0);
    useEffect(() => {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        setCartLength(products.length);
    }
    , []);
    
    return (
        <CartLengthContext.Provider value={{ cartLength, setCartLength }}>
        {children}
        </CartLengthContext.Provider>
    );
}