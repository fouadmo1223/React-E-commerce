import { Route, Routes } from "react-router-dom";
import { Homepage } from "./componnents/website/HomePage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/dashboard/DashboardLayout";
import RequireAuth from "./pages/Auth/RequireAuth";
// users componnets
import Users from "./pages/dashboard/users/Users";
import AddUser from "./pages/dashboard/users/AddUser";
// peroducts compnents
import Products from "./pages/dashboard/products/Products";
import AddProduct from "./pages/dashboard/products/Addprdouct";
// categories Componnets
import Categories from "./pages/dashboard/categories/Categories";
import AddCategory from "./pages/dashboard/categories/AddCategory";
// writer componnets
import Writer from "./pages/dashboard/writer/Writer";
//error componnents
import Error404 from "./pages/Auth/Error404";
import EditProduct from "./pages/dashboard/products/EditProduct";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import Hero from "./componnents/website/Hero";
import ShowProdcuts from "./componnents/website/ShowProducts";
import Footer from "./componnents/website/Footer";
import WebsiteProducts from "./componnents/website/WebsiteProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProductDetails from "./componnents/website/ProductDetails";
import Cart from "./componnents/website/Cart";
import ScrollToTop from "./componnents/website/ScrollToTop";
import CheckOut from "./componnents/website/CheckOut";
import Contact from "./componnents/website/Contact";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ShowProdcuts />
              </>
            }
          />
          <Route path="products" element={<WebsiteProducts />} />
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/*" element={<Error404 />} />

        {/* Protected routes */}
        <Route
          element={<RequireAuth allowedRoles={["1995", "2000", "1999"]} />}
        >
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />

            {/* Admin only routes (role 1995) */}
            <Route element={<RequireAuth allowedRoles={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["2000", "1995"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["1999", "1995"]} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="products" element={<Products />} />
              <Route path="product/add" element={<AddProduct />} />
              <Route path="product/edit/:productId" element={<EditProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
