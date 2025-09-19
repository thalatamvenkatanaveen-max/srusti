import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaCloudUploadAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";
import { BsFillPlayCircleFill } from "react-icons/bs";

/* 🔹 Status Badge Component */
export const StatusBadge = ({ status, isPublished }) => {
  if (status === "INACTIVE" && !isPublished) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
        <FaTimesCircle /> Inactive
      </span>
    );
  }
  if (status === "INACTIVE" && isPublished) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
        <FaCheckCircle /> Completed
      </span>
    );
  }
  if (status === "ACTIVE" && isPublished) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
        <MdPublishedWithChanges /> Published
      </span>
    );
  }
  if (status === "ACTIVE" && !isPublished) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
        <BsFillPlayCircleFill /> Active
      </span>
    );
  }
  return null;
};

/* 🔹 Action Buttons Component */
export const ActionButtons = ({ onPublish, onEdit, onDelete }) => (
  <div className="mt-4 flex justify-end gap-3">
    <button
      className="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-600 hover:shadow-md"
      title="Publish Appointment"
      onClick={onPublish}
    >
      <FaCloudUploadAlt size={16} />
      <span>Publish</span>
    </button>

    <button
      className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-600 hover:shadow-md"
      title="Edit Appointment"
      onClick={onEdit}
    >
      <FiEdit size={16} />
      <span>Edit</span>
    </button>

    <button
      className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-600 hover:shadow-md"
      title="Delete Appointment"
      onClick={onDelete}
    >
      <FiTrash2 size={16} />
      <span>Delete</span>
    </button>
  </div>
);

/* 🔹 Reusable Confirmation Modal */
export const ConfirmModal = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-3 text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mb-6 text-sm text-gray-600">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
