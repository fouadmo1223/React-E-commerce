import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./css/componnets/form.css";
import "./css/componnets/button.css";
import "./css/base/media.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import SideBarContetxProvider from "./contetx/SideBarContext";
import WindowContext from "./contetx/WindowContetx";
import "animate.css";
import UserContextProvider from "./contetx/UserContetx";
import CartLengthContextProvider from "./contetx/CartLengthContext";
import AOS from "aos";
import "aos/dist/aos.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
AOS.init();
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SideBarContetxProvider>
        <WindowContext>
          <UserContextProvider>
            <CartLengthContextProvider>
              <App />
            </CartLengthContextProvider>
          </UserContextProvider>
        </WindowContext>
      </SideBarContetxProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
