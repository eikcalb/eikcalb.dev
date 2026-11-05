import { useEffect } from "react";
import { MdClose } from "react-icons/md";

/**
 * Simple centered modal overlay. Closes on backdrop click or Escape.
 */
export const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm animate__animated animate__faster animate__fadeIn sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl animate__animated animate__faster animate__zoomIn dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-slate-600 hover:bg-slate-100 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <MdClose className="text-xl" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
