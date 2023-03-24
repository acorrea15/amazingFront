/* import Swal from "sweetalert"; */
const Swal = require('sweetalert2')

const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// Handle toast notifications, pass icon and title as parameters, if you want to add more parameters,
// add them to the toast.fire object and pass them as parameters
// Example: handleToast("success", "Bienvenido", "Your are logged in")
// if you want to create other functions with other toast configurations, just copy this function and change the configuration

export const handleToast = (icon, title) => {
  return toast.fire({
    icon: icon,
    title: title,
  });
};
