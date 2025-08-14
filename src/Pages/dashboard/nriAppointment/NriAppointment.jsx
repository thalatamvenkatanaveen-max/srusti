import { useEffect, useState } from "react";
import axios from "axios";
import { thirtyMinSlots } from "../../../utils/slotConstants";
import CustomModal from "../../../components/CustomModal";
import AddNriSlots from "./AddNriAppointmentSlots";

export default function NriAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/nriAppointment");
        setAppointments(res.data);
      } catch (err) {
        setError("Failed to fetch appointments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleClose = () => setVisible(false);

  if (loading)
    return <div className="p-4 text-center">Loading appointments...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      {/* Modal */}
      <CustomModal
        open={visible}
        handleClose={handleClose}
        title="Add Nri Appointments"
      >
        <AddNriSlots handleClose={handleClose} />
      </CustomModal>

      {/* Header + Add Button */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Nri Appointments</h2>
        <button
          className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
          onClick={() => setVisible(true)}
        >
          Add Appointments
        </button>
      </div>

      <div className="mb-3 flex justify-between">
        <div className="space-x-4">
          <p className="inline-block rounded-2xl bg-amber-200 px-3 py-2">All</p>
          <p className="inline-block rounded-2xl bg-amber-200 px-3 py-2">
            Published
          </p>
          <p className="inline-block rounded-2xl bg-amber-200 px-3 py-2">
            Active
          </p>
          <p className="inline-block rounded-2xl bg-amber-200 px-3 py-2">
            Inactive
          </p>
          <p className="inline-block rounded-2xl bg-amber-200 px-3 py-2">
            Completed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            className="w-full min-w-3xs rounded-lg border px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:outline-none"
          />
          <button>Search</button>
        </div>
      </div>

      {/* List or Empty Message */}
      {appointments.length === 0 ? (
        <div className="p-4 text-center">No appointments found.</div>
      ) : (
        appointments.map((appt) => (
          <div
            key={appt.appointment_id}
            className="mb-6 rounded-lg border border-gray-300 bg-white p-4 shadow"
          >
            <div className="mb-3">
              <p>
                <strong>Date:</strong> {appt.appointment_date}
              </p>
              <p>
                <strong>Duration:</strong> {appt.duration} minutes
              </p>
              <p>
                <strong>Total Slots:</strong> {appt.total_appointments}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-bold">Slots:</span>
              <ul className="flex flex-wrap gap-3">
                {appt.slots.map((slot) => (
                  <li
                    key={slot.slot_id}
                    className="rounded-2xl border bg-amber-100 px-4 py-1"
                  >
                    {
                      thirtyMinSlots.find(
                        (val) =>
                          val.value ===
                          `${slot.start_time.split(":")[0]}:${slot.start_time.split(":")[1]} - ${slot.end_time.split(":")[0]}:${slot.end_time.split(":")[1]}`,
                      ).label
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
