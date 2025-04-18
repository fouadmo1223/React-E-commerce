import axios from "axios";
import { useContext, useState } from "react";
import { baseUrl, LOGIN } from "../../api/api";

import { Loading } from "notiflix";
import Cookie from "cookie-universal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contetx/UserContetx";
export default function Register() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const cookies = Cookie();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [formDataErrors, setFormDataErrors] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formDataErrors[name] || error) {
      setFormDataErrors((prev) => ({ ...prev, [name]: "" }));
      setError(null);
    }
  }

  function validateForm() {
    let isValid = true;
    const newErrors = { ...formDataErrors };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormDataErrors(newErrors);
    return isValid;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    Loading.hourglass({
      clickToClose: false,
      svgSize: "60px",
    });

    try {
      const response = await axios.post(`${baseUrl}/${LOGIN}`, formData);
      const {
        token,
        user: { role },
      } = response.data;
      cookies.set("E-commerce", token);
      cookies.set("user", response.data.user);

      setUser(response.data.user);

      setFormData({
        email: "",
        password: "",
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have been registered successfully",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        if (role === "1995" || role === "2000" || role === "1999") {
          navigate("/dashboard");
        } else if (role === "2001") {
          navigate("/");
        }
      });
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          setFormDataErrors({
            email: error.response.data.errors.email?.[0] || "",
            password: error.response.data.errors.password?.[0] || "",
          });
        } else {
          setError(error.response.data.error || "Registration failed");
        }
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred: " + error.message);
      }
    } finally {
      setLoading(false);
      Loading.remove();
    }
  }

  return (
    <div className="container">
      <div className="row height-100">
        <form className="form" onSubmit={handleSubmit}>
          <div className="cutsome-form">
            <h1 style={{ marginBottom: "15px" }}>Login Now</h1>

            <div
              style={{ border: "none", backgroundColor: "transparent" }}
              className="form-control"
            >
              <input
                required
                value={formData.email}
                onChange={handleChange}
                id="email"
                type="email"
                name="email"
                className={`form-control ${
                  formDataErrors.email && "is-invalid"
                }`}
                placeholder="Enter Your E-Mail..."
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
            </div>
            <div
              style={{ border: "none", backgroundColor: "transparent" }}
              className="form-control"
            >
              <input
                required
                value={formData.password}
                onChange={handleChange}
                id="password"
                type="password"
                name="password"
                minLength={"6"}
                className={`form-control ${
                  formDataErrors.password && "is-invalid"
                }`}
                placeholder="Enter Your Password..."
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <div>
                {error && (
                  <div
                    className=" invalid-feedback "
                    style={{ display: error ? "block" : "none" }}
                  >
                    {typeof error === "object" ? JSON.stringify(error) : error}
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="button btn-primary reg"
                disabled={loading}
              >
                {loading ? "Login..." : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
