import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { thirtyMinSlots } from "../../../utils/slotConstants";
import CustomModal from "../../../components/CustomModal";
import AddNriSlots from "./AddNriAppointmentSlots";
import { FaCalendarTimes, FaSpinner } from "react-icons/fa";
import { API_BASE_URL } from "../../../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ActionButtons, ConfirmModal, StatusBadge } from "./utils";

export default function NriAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [searchedDate, setSearchedDate] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedData, setSelectedData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // For confirmation modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const fetchAppointmentsData = useCallback(
    async (params = {}, filterLabel = "All") => {
      try {
        setLoading(true);
        setError("");
        setActiveFilter(filterLabel);
        const query = new URLSearchParams(params).toString();
        const res = await axios.get(
          `${API_BASE_URL}/api/nriAppointment${query ? `?${query}` : ""}`,
        );
        setAppointments(res.data.data || res.data);
      } catch (err) {
        setError("Failed to fetch appointments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchAppointmentsData();
  }, [fetchAppointmentsData]);

  const handleClose = () => {
    setSelectedData(null);
    setVisible(false);
    setIsEdit(false);
  };

  const filters = useMemo(
    () => [
      { label: "All", params: {} },
      { label: "Published", params: { status: "ACTIVE", published: true } },
      { label: "Active", params: { status: "ACTIVE", published: false } },
      { label: "Inactive", params: { status: "INACTIVE", published: false } },
      { label: "Completed", params: { status: "INACTIVE", published: true } },
    ],
    [],
  );

  const handlePublish = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/api/nriAppointment/publish`, {
        appointment_id: id,
      });
      toast.success("Appointment published successfully");
      fetchAppointmentsData();
    } catch (error) {
      console.error("Error publishing appointment:", error);
      toast.error("Failed to publish appointment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/nriAppointment/${id}`);
      toast.success("Appointment deleted successfully");
      fetchAppointmentsData();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Failed to delete appointment");
    }
  };

  // Confirm Delete
  const confirmDelete = (id) => {
    setConfirmTitle("Delete Appointment");
    setConfirmMessage("Are you sure you want to delete this appointment?");
    setConfirmOpen(true);
    setConfirmAction(() => () => {
      handleDelete(id);
      setConfirmOpen(false);
    });
  };

  // Confirm Publish
  const confirmPublish = (id) => {
    setConfirmTitle("Publish Appointment");
    setConfirmMessage("Are you sure you want to publish this appointment?");
    setConfirmOpen(true);
    setConfirmAction(() => () => {
      handlePublish(id);
      setConfirmOpen(false);
    });
  };

  const handleEdit = (data) => {
    setVisible(true);
    setIsEdit(true);
    setSelectedData(data);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Confirmation Modal */}
      <ConfirmModal
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onConfirm={confirmAction}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* Modal */}
      <CustomModal
        open={visible}
        handleClose={handleClose}
        title={isEdit ? "Edit NRI Appointments" : "Add NRI Appointments"}
      >
        <AddNriSlots
          handleClose={handleClose}
          isEdit={isEdit}
          selectedData={selectedData}
          appointments={appointments}
          setAppointments={setAppointments}
        />
      </CustomModal>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold sm:text-2xl">NRI Appointments</h2>
        <button
          className="w-full rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700 sm:w-auto"
          onClick={() => setVisible(true)}
        >
          Add Appointments
        </button>
      </div>

      {/* Filters + Search */}
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.label}
              className={`rounded-2xl px-3 py-2 text-sm transition sm:text-base ${
                activeFilter === f.label
                  ? "bg-amber-500 text-white"
                  : "bg-amber-200 hover:bg-amber-300"
              }`}
              onClick={() => fetchAppointmentsData(f.params, f.label)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          <input
            type="date"
            value={searchedDate}
            onChange={(e) => setSearchedDate(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:outline-none sm:w-auto"
          />
          <button
            className="rounded bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!searchedDate}
            onClick={() =>
              fetchAppointmentsData({ date: searchedDate }, "Search")
            }
          >
            Search
          </button>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center p-6 text-amber-600">
          <FaSpinner className="mr-2 animate-spin" /> Loading appointments...
        </div>
      )}
      {error && <div className="p-4 text-center text-red-500">{error}</div>}

      {/* Appointments List */}
      {!loading && !error && (
        <>
          {appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 p-6 text-gray-500">
              <FaCalendarTimes size={32} />
              <p>No appointments found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {appointments.map((appt) => (
                <div
                  key={appt.appointment_id}
                  className="relative rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:scale-[1.01] hover:shadow-md"
                >
                  {/* Status Badge */}
                  <div className="absolute top-5 right-5">
                    <StatusBadge
                      status={appt.status}
                      isPublished={appt.is_published}
                    />
                  </div>

                  {/* Appointment Details */}
                  <div className="mt-8 mb-3 space-y-1 text-sm sm:text-base">
                    <p>
                      <strong className="text-gray-700">Date:</strong>{" "}
                      {appt.appointment_date}
                    </p>
                    <p>
                      <strong className="text-gray-700">Duration:</strong>{" "}
                      {appt.duration} minutes
                    </p>
                    <p>
                      <strong className="text-gray-700">Total Slots:</strong>{" "}
                      {appt.total_appointments}
                    </p>
                  </div>

                  {/* Slots List */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                    <span className="font-bold text-gray-700">Slots:</span>
                    <ul className="flex flex-wrap gap-2">
                      {appt.slots.map((slot) => {
                        const formattedTime = `${slot.start_time.split(":")[0]}:${
                          slot.start_time.split(":")[1]
                        } - ${slot.end_time.split(":")[0]}:${
                          slot.end_time.split(":")[1]
                        }`;
                        const slotObj = thirtyMinSlots.find(
                          (val) => val.value === formattedTime,
                        );
                        return (
                          <li
                            key={slot.slot_id}
                            className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs text-amber-800 sm:text-sm"
                          >
                            {slotObj?.label || formattedTime}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  {appt.status === "ACTIVE" && !appt.is_published && (
                    <ActionButtons
                      onPublish={() => confirmPublish(appt.appointment_id)}
                      onEdit={() => handleEdit(appt)}
                      onDelete={() => confirmDelete(appt.appointment_id)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
