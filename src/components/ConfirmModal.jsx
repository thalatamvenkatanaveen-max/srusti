import { Dialog } from "@headlessui/react";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-600">
            {message}
          </Dialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <button
              className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              OK
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
