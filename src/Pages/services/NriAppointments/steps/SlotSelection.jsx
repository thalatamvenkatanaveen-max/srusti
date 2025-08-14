import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import CustomInputSelect from "../../../../components/controls/CustomInputSelect";

// Helper to get { label, value, year, monthNum }
const getMonthOptions = () => {
  const now = new Date();
  return [0, 1, 2].map((offset) => {
    const date = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    return {
      label: date.toLocaleString("default", { month: "long", year: "numeric" }),
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      year: date.getFullYear(),
      monthNum: date.getMonth() + 1, // For API query
    };
  });
};

const SlotSelection = () => {
  const { control, setValue, watch, register } = useFormContext();
  const selectedAppointmentId = watch("appointment_id");

  const monthOptions = getMonthOptions();
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState([]);

  const ttr = watch();
  console.log(ttr);

  // Fetch appointments when selectedMonth changes
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/nriAppointment/appointments-by-month?year=${selectedMonth.year}&month=${selectedMonth.monthNum}`,
        );
        const formatted = res.data.map((a) => ({
          label: a.appointment_date,
          value: a.appointment_id,
        }));
        setAppointments(formatted);
        setValue("appointment_id", ""); // Reset on month change
        setSlots([]);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, [selectedMonth, setValue]);

  // Fetch slots when appointment is selected
  useEffect(() => {
    if (!selectedAppointmentId) return;
    const fetchSlots = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/nriAppointment/appointments/${selectedAppointmentId}/slots`,
        );
        setSlots(res.data);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    };
    fetchSlots();
  }, [selectedAppointmentId]);

  return (
    <div className="w-full">
      {/* Month Pills */}
      <div className="mb-4 flex gap-2">
        {monthOptions.map((m) => (
          <button
            key={m.value}
            className={`rounded-xl border px-4 py-2 font-medium transition-colors ${
              m.value === selectedMonth.value
                ? "border-amber-500 bg-amber-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-amber-50"
            }`}
            onClick={() => setSelectedMonth(m)}
            type="button"
          >
            {m.label}
          </button>
        ))}
      </div>
      <p> {appointments.length} appointments</p>
      <CustomInputSelect
        name="appointment_id"
        control={control}
        label="Select Appointment Date"
        options={appointments}
        required
      />
      <div className="mt-4">
        <h3 className="mb-2 font-semibold">Available Slots:</h3>
        {slots.length > 0 ? (
          <ul className="pl-5 text-gray-800">
            {slots.map((slot, idx) => {
              const slotVal = slot.start_time + "-" + slot.end_time;
              return (
                <li key={idx}>
                  <input
                    {...register("slotValue", { required: true })}
                    type="radio"
                    value={slotVal}
                    id={`slot-${idx}`}
                  />
                  <label
                    htmlFor={`slot-${idx}`}
                    className="ml-2 cursor-pointer"
                  >
                    {slotVal}
                  </label>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">No slots found.</p>
        )}
      </div>
    </div>
  );
};

export default SlotSelection;
