import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const showAlert = (type, message) => {
  Swal.fire({
    icon: type, // 'success' or 'error'
    title: type === 'success' ? 'Success!' : 'Oops!',
    text: message,
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      popup: 'swal-custom-popup',
      icon: 'swal-custom-icon',
    },
    willOpen: () => {
      // Disable background scroll when alert is shown
      document.body.style.overflow = 'hidden';
    },
    willClose: () => {
      // Re-enable background scroll when alert is closed
      document.body.style.overflow = 'auto';
    }
  });
};
