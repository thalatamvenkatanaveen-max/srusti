import { useEffect, useState } from "react";
import axios from "axios";
import { thirtyMinSlots } from "../../../utils/slotConstants";

export default function NriAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(
    thirtyMinSlots.find((val) => val.value === "01:00 - 01:30").label,
  );
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

  if (loading)
    return <div className="p-4 text-center">Loading appointments...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (appointments.length === 0)
    return <div className="p-4 text-center">No appointments found.</div>;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="mb-6 text-2xl font-bold">NRI Appointments</h2>

      {appointments.map((appt) => (
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

          <div>
            <p className="font-semibold">Slots:</p>
            <ul className="list-disc pl-6">
              {appt.slots.map((slot) => (
                <li key={slot.slot_id}>
                  {/* {slot.start_time} - {slot.end_time} */}
                  {
                    thirtyMinSlots.find(
                      (val) =>
                        val.value ===
                        slot.start_time.split(":")[0] +
                          ":" +
                          slot.start_time.split(":")[1] +
                          " - " +
                          slot.end_time.split(":")[0] +
                          ":" +
                          slot.end_time.split(":")[1],
                    ).label
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
