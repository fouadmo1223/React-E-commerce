import { createContext, useState } from "react";

export const SideBarContetx = createContext("");

export default function SideBarContetxProvider({ children }) {
  const [isOpend, setIsOpend] = useState(true);
  return (
    <SideBarContetx.Provider value={{ isOpend, setIsOpend }}>
      {children}
    </SideBarContetx.Provider>
  );
}
