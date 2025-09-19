import { useEffect, useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import CustomInputSelect from "../../../../components/controls/CustomInputSelect";
import { API_BASE_URL } from "../../../../utils/constants";

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
  const { control, setValue, register, watch } = useFormContext();

  const allData = watch();
  console.log(allData, "909090");

  const monthOptions = getMonthOptions();
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const fetchAppointmentsByMonth = async (monthObj) => {
    setLoadingAppointments(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/nriAppointment/published-appointments-month?year=${monthObj.year}&month=${monthObj.monthNum}`,
      );
      setAppointments(res.data.data || []);
      // Reset form values when month changes
      setValue("appointment_id", "");
      setValue("selectedSlot", "");
      setSlots([]);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoadingAppointments(false);
    }
  };

  const getSlotsByAppointmentId = useCallback(
    async (id) => {
      setLoadingSlots(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/nriAppointment/${id}/slots`,
        );
        setSlots(res.data || []);
        setValue("selectedSlot", "");
      } catch (err) {
        console.error("Error fetching slots:", err);
      } finally {
        setLoadingSlots(false);
      }
    },
    [setValue],
  );

  console.log();

  useEffect(() => {
    if (selectedMonth) {
      fetchAppointmentsByMonth(selectedMonth);
    }
  }, [selectedMonth]);

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

      {/* Appointments */}
      {loadingAppointments ? (
        <p className="text-gray-500">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No appointments available</p>
      ) : (
        <>
          <p>{appointments.length} appointments</p>
          <CustomInputSelect
            name="appointment_id"
            control={control}
            label="Select Appointment Date"
            options={appointments.map((a) => ({
              label: a.appointment_date,
              value: a.appointment_id,
            }))}
            onChange={(e) => {
              setValue("appointment_id", e.target.value);
              getSlotsByAppointmentId(e.target.value);
            }}
            required
          />
        </>
      )}

      {/* Slots */}
      <div className="mt-4">
        <h3 className="mb-2 font-semibold">Available Slots:</h3>
        {loadingSlots ? (
          <p className="text-gray-500">Loading slots...</p>
        ) : slots.length > 0 ? (
          <ul className="pl-5 text-gray-800">
            {slots.map((slot) => {
              const slotVal = slot.start_time + "-" + slot.end_time;
              return (
                <li key={slot.slot_id}>
                  <input
                    {...register("selectedSlot", { required: true })}
                    type="radio"
                    value={slot.slot_id}
                    id={slot.slot_id}
                  />
                  <label htmlFor={slot.slot_id} className="ml-2 cursor-pointer">
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
