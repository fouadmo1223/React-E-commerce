import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { SideBarContetx } from "./../../contetx/SideBarContext";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { Loading } from "notiflix";
import axios from "axios";
import { baseUrl, USER } from "../../api/api";
import NavAvatar from "./NavAvatar";

export default function Navbar() {
  const cookie = Cookie();
  const [name, setName] = useState("");
  const [, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const token = cookie.get("E-commerce");

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    Loading.pulse({
      clickToClose: false,
      svgSize: "50px",
    });

    axios
      .get(`${baseUrl}/${USER}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setName(response.data.name);
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      })
      .finally(() => {
        Loading.remove();
      });
  }, [token]);

  const { setIsOpend } = useContext(SideBarContetx);

  return (
    <div
      style={{
        zIndex: 100,
        position: isScrolled ? "fixed" : "relative",
        top: 0,
        left: 0,
        right: 0,
        transition: "all 0.3s ease",
        backgroundColor: "white" ,
        boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
      }}
      className="nav-bar d-flex justify-content-between align-items-center"
    >
      <div className="d-flex w-100 align-items-center justify-content-between">
        <div className="d-flex gap-4 align-items-center">
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            Ecommerce
          </h2>
          <FontAwesomeIcon
            onClick={() => setIsOpend((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
          />
        </div>
        <div className="d-flex align-items-center gap-4">
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            {name.toLocaleUpperCase()}
          </span>
          <NavAvatar name={name ? name : ""} />
        </div>
      </div>
    </div>
  );
}
