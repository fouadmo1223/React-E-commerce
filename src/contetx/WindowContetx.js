import { createContext, useState, useEffect } from "react";

export const windowContext = createContext(); // Note lowercase 'w' for consistency

export default function WindowContextProvider({ children }) {
  const [windowSized, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <windowContext.Provider value={{ windowSized }}>
      {children}
    </windowContext.Provider>
  );
}
