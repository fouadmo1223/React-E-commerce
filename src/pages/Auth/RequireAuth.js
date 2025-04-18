import Cookie from "cookie-universal";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, USER } from "./../../api/api";
import { Loading } from "notiflix";
import Error403 from "./Error403";

export default function RequireAuth({ allowedRoles }) {
  const cookie = Cookie();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = cookie.get("E-commerce");

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
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
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        cookie.remove("E-commerce");
        navigate("/login", { replace: true });
      })
      .finally(() => {
        Loading.remove();
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return null; // or return a loading spinner
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!user) {
    return null; // or handle this case appropriately
  }

  // Check if user has any of the allowed roles
  const hasRequiredRole = allowedRoles?.includes(user.role);

  return hasRequiredRole ? <Outlet /> : <Error403 />;
}
