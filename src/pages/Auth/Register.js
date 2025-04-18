import axios from "axios";
import { useState } from "react";
import { baseUrl, REGISTER } from "../../api/api";
import { Loading } from "notiflix";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [formDataErrors, setFormDataErrors] = useState({
    name: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

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
      const response = await axios.post(`${baseUrl}/${REGISTER}`, formData);

      setFormData({
        name: "",
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
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.data.errors) {
          setFormDataErrors({
            name: error.response.data.errors.name?.[0] || "",
            email: error.response.data.errors.email?.[0] || "",
            password: error.response.data.errors.password?.[0] || "",
          });
        } else {
          setError(error.response.data.message);

          setError(error.response.data.message || "Registration failed");
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
        <Form className="form" onSubmit={handleSubmit}>
          <div className="cutsome-form">
            <h1 style={{ marginBottom: "15px" }}>Register Now</h1>
            <div
              style={{ border: "none", backgroundColor: "transparent" }}
              className="form-control"
            >
              <input
                value={formData.name}
                onChange={handleChange}
                id="name"
                type="text"
                name="name"
                required
                className={`form-control ${
                  formDataErrors.name && "is-invalid"
                }`}
                placeholder="Enter Your Name..."
              />
              <label htmlFor="name" className="form-label">
                Name
              </label>
              {formDataErrors.name && (
                <div
                  className="invalid-feedback "
                  style={{ display: error ? "block" : "none" }}
                >
                  {formDataErrors.name}
                </div>
              )}
            </div>
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
              {formDataErrors.email && (
                <div
                  className="invalid-feedback  "
                  style={{ display: formDataErrors.email ? "block" : "none" }}
                >
                  {formDataErrors.email}
                </div>
              )}
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
              {formDataErrors.password && (
                <div
                  className="invalid-feedback "
                  style={{ display: error ? "block" : "none" }}
                >
                  {formDataErrors.password}
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="button btn-primary reg"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              {error && (
                <div className="alert alert-danger">
                  {typeof error === "object" ? JSON.stringify(error) : error}
                </div>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
