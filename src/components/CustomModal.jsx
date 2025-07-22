import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const CustomModal = ({ open, handleClose, title, children }) => {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, handleClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 opacity-100 transition-opacity duration-300"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="mx-8 rounded-2xl bg-white p-4 md:w-xl md:p-6 lg:w-2xl lg:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          <button onClick={handleClose} aria-label="Close">
            <AiOutlineClose className="cursor-pointer text-xl font-bold" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default CustomModal;
