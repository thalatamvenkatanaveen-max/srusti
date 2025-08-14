import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const CustomModal = ({ open, handleClose, title, children }) => {
  const panelRef = useRef(null);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, handleClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus modal panel for accessibility
  useEffect(() => {
    if (open && panelRef.current) panelRef.current.focus();
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
        aria-hidden="true"
      />
      {/* Scroll container (if modal taller than viewport) */}
      <div className="pointer-events-none fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Modal panel */}
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className="pointer-events-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 mb-2 flex items-center justify-between border-b border-gray-300 p-4">
              {title && <h2 className="text-lg font-semibold">{title}</h2>}
              <button onClick={handleClose} aria-label="Close">
                <AiOutlineClose className="text-xl" />
              </button>
            </div>

            {/* Scrollable content area */}
            <div className="no-scrollbar max-h-[80vh] overflow-y-auto px-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CustomModal;
