import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNriSlotsSchema } from "../../validations/addNriSlots.schema";
import CustomInputDate from "../../components/controls/CustomInputDate";
import CustomTextInput from "../../components/controls/CustomInputText";
import { thirtyMinSlots, oneHourSlots } from "../../utils/slotConstants";
import axios from "axios";
import CustomInputSelect from "../../components/controls/CustomInputSelect";

export default function AddNriSlots() {
  const { control, handleSubmit, watch, reset, setValue } = useForm({
    resolver: yupResolver(addNriSlotsSchema),
  });

  const required = true;
  const duration = watch("duration");
  const slotsTemplate = duration === "30" ? thirtyMinSlots : oneHourSlots;

  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlot = (value) => {
    setSelectedSlots((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      slots: selectedSlots,
    };
    try {
      const res = await axios.post(
        "http://localhost:4000/api/nriAppointment",
        payload,
      );
      console.log(res);
      setSelectedSlots([]);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Add NRI Slots</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <CustomInputDate
          control={control}
          label="Appointment Date"
          name="appointment_date"
          required={required}
        />

        <CustomTextInput
          control={control}
          name="total_appointments"
          label="Total Slots"
          placeholder="e.g., 3"
          required={required}
        />

        <CustomInputSelect
          control={control}
          name="duration"
          label="Duration"
          options={[
            { label: "30 Minutes", value: "30" },
            { label: "60 Minutes", value: "60" },
          ]}
          required={required}
          onChange={(e) => {
            setSelectedSlots([]);
            setValue("duration", e.target.value);
          }}
        />

        {/* Slot Checkboxes */}
        <div>
          <p className="font-medium text-gray-700">
            Select Slots ({duration}-minute intervals)
          </p>
          <div className="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto rounded-lg border p-3">
            {slotsTemplate.map((slot, idx) => (
              <label key={idx} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-amber-600"
                  checked={selectedSlots.includes(slot.value)}
                  onChange={() => toggleSlot(slot.value)}
                />
                <span className="text-gray-800">{slot.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-amber-600 py-2 font-semibold text-white transition hover:bg-amber-700"
        >
          Save Slots
        </button>
      </form>
    </div>
  );
}
