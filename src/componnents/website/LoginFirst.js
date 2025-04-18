import Swal from "sweetalert2";

export default function LoginFirst() {
  Swal.fire({
    title: "You Must Login First?",
    icon: "Info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Continue",
    confirmButtonText: "Login",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/login";
    }
  });
}
