import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StatusRespons({ status, message }) {
  return new Promise((resolve) => {
    const swalConfig = {
      position: "center",
      title: message,
      showConfirmButton: false,
      timer: 1000,
    };

    const toastConfig = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };

    if (status === "success") {
      Swal.fire({
        ...swalConfig,
        icon: "success",
      }).then(() => {
        toast.success(message, toastConfig);
        setTimeout(resolve, 3000); // Resolve after toast autoClose
      });
    } else {
      Swal.fire({
        ...swalConfig,
        icon: "error",
      }).then(() => {
        toast.error(message, toastConfig);
        setTimeout(resolve, 3000); // Resolve after toast autoClose
      });
    }
  });
}
