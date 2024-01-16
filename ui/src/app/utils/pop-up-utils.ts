import Swal from "sweetalert2";

export function SomethingWentWrong(): void {
  Swal.fire({
    title: "Oopps!",
    text: "Something went wrong.",
    icon: "error"
  }).then(() => {});
}

