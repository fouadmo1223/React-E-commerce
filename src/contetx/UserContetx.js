import { createContext, useState } from "react";
import Cookie from "cookie-universal";
export const UserContext = createContext(null);

export default function UserContextProvider ({children}){
    const cookies = Cookie();
     const [user, setUser] = useState(() => {
       // Initialize from cookie or localStorage if available
       const savedUser =
         cookies.get("user") || JSON.parse(localStorage.getItem("user")) || null;
       return savedUser;
     });
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}