import "./bars.css";
import {
  faBasketShopping,
  faCartPlus,
  faCartShopping,
  faFeather,
  faShop,
  faUserPlus,
  faUsersSlash,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SideBarContetx } from "./../../contetx/SideBarContext";
import { windowContext } from "../../contetx/WindowContetx";
import axios from "axios";
import { baseUrl, USER } from "../../api/api";
import Cookie from "cookie-universal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  const { isOpend } = useContext(SideBarContetx);
  const { windowSized } = useContext(windowContext);
  const [user, setUser] = useState(null);
  const cookie = Cookie();
  const token = cookie.get("E-commerce");

  useEffect(() => {
    axios
      .get(`${baseUrl}/${USER}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [token]);

  const windowWidth = parseInt(windowSized?.width) || 0;

  // Desktop version (≥768px)
  if (windowWidth >= 768) {
    return (
      <div
        className="side-bar pt-3"
        style={{ width: isOpend ? "240px" : "90px" }}
      >
        {/* Admin links */}
        {user?.role === "1995" && (
          <>
            <NavLink
              to="users"
              className="d-flex gap-2 align-items-center side-bar-link"
            >
              <FontAwesomeIcon
                style={{
                  padding: isOpend ? "10px 8px 10px 15px" : "10px 13px",
                }}
                icon={faUsersSlash}
              />
              {isOpend && <p className="m-0">Users</p>}
            </NavLink>
            <NavLink
              to="user/add"
              className="d-flex gap-2 align-items-center side-bar-link"
            >
              <FontAwesomeIcon
                style={{
                  padding: isOpend ? "10px 8px 10px 15px" : "10px 13px",
                }}
                icon={faUserPlus}
              />
              {isOpend && <p className="m-0">Add User</p>}
            </NavLink>
          </>
        )}

        {/* Categories links */}
        {(user?.role === "1995" || user?.role === "1999") && (
          <>
            <NavLink
              to="categories"
              className="d-flex gap-2 align-items-center side-bar-link"
            >
              <FontAwesomeIcon
                style={{
                  padding: isOpend ? "10px 8px 10px 15px" : "10px 13px",
                }}
                icon={faCartShopping}
              />
              {isOpend && <p className="m-0">Categories</p>}
            </NavLink>
            <NavLink
              to="category/add"
              className="d-flex gap-2 align-items-center side-bar-link"
            >
              <FontAwesomeIcon
                style={{
                  padding: isOpend ? "10px 8px 10px 15px" : "10px 13px",
                }}
                icon={faCartPlus}
              />
              {isOpend && <p className="m-0">Add Category</p>}
            </NavLink>
            <NavLink
              to="products"
              className="d-flex gap-2 align-items-center side-bar-link"
            >
              <FontAwesomeIcon
                style={{
                  padding: isOpend ? "10px 8px 10px 15px" : "10px 13px",
                }}
                icon={faShop}
              />
              {isOpend && <p className="m-0">Products</p>}
            </NavLink>{" "}
            <NavLink
              to="product/add"
              className="d-flex gap-2 align-items-center side-bar-link"
            >
              <FontAwesomeIcon
                style={{
                  padding: isOpend ? "10px 8px 10px 15px" : "10px 13px",
                }}
                icon={faBasketShopping}
              />
              {isOpend && <p className="m-0">Add Product</p>}
            </NavLink>
          </>
        )}
      </div>
    );
  }

  // Mobile version (<768px)
  return (
    <div
      className="side-bar pt-3"
      style={{
        width: isOpend ? "90px" : "0",
        display: isOpend ? "block" : "none",
        position: "fixed",
        left: 0,
        zIndex: 100,
        overflow: "hidden",
        transition: "width 0.3s ease",
      }}
    >
      {/* Admin links */}
      {user?.role === "1995" && (
        <>
          <NavLink
            to="users"
            className="d-flex gap-2 align-items-center side-bar-link"
          >
            <FontAwesomeIcon
              style={{ padding: "10px 13px" }}
              icon={faUsersSlash}
            />
          </NavLink>
          <NavLink
            to="user/add"
            className="d-flex gap-2 align-items-center side-bar-link"
          >
            <FontAwesomeIcon
              style={{ padding: "10px 13px" }}
              icon={faUserPlus}
            />
          </NavLink>
        </>
      )}

      {/* Categories links */}
      {(user?.role === "1995" || user?.role === "1999") && (
        <>
          <NavLink
            to="categories"
            className="d-flex gap-2 align-items-center side-bar-link"
          >
            <FontAwesomeIcon
              style={{ padding: "10px 13px" }}
              icon={faCartShopping}
            />
          </NavLink>
          <NavLink
            to="category/add"
            className="d-flex gap-2 align-items-center side-bar-link"
          >
            <FontAwesomeIcon
              style={{ padding: "10px 13px" }}
              icon={faCartPlus}
            />
          </NavLink>
          <NavLink
            to="products"
            className="d-flex gap-2 align-items-center side-bar-link"
          >
            <FontAwesomeIcon style={{ padding: "10px 13px" }} icon={faShop} />
          </NavLink>
          <NavLink
            to="product/add"
            className="d-flex gap-2 align-items-center side-bar-link"
          >
            <FontAwesomeIcon
              style={{ padding: "10px 13px" }}
              icon={faBasketShopping}
            />
          </NavLink>
        </>
      )}
    </div>
  );
}
