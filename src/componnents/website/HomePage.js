import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export function Homepage() {
  return (
    <div className="">
      <ScrollToTop /> {/* Scroll to top on route change */}
      <Navbar />
      <main style={{ padding: "20px" }}>
        {" "}
        {/* Add consistent padding */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
