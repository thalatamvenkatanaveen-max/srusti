import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNriSlotsSchema } from "../../validations/addNriSlots.schema";
import CustomInputDate from "../../components/controls/CustomInputDate";
import CustomTextInput from "../../components/controls/CustomInutText";
import { thirtyMinSlots, oneHourSlots } from "../../utils/slotConstants";

export default function AddNriSlots() {
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(addNriSlotsSchema),
    defaultValues: {
      date: "",
      totalSlots: "",
      duration: "30",
    },
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

  const onSubmit = (data) => {
    const payload = {
      ...data,
      slots: selectedSlots,
    };
    console.log("Submitting to API:", payload);
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Add NRI Slots</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <CustomInputDate
          control={control}
          label="Appointment Date"
          name="date"
          required={required}
        />

        <CustomTextInput
          control={control}
          name="totalSlots"
          label="Total Slots"
          placeholder="e.g., 3"
          required={required}
        />

        {/* Duration Dropdown */}
        <div>
          <label className="mb-1 block font-medium text-gray-700">
            Duration (in minutes) <span className="text-red-500">*</span>
          </label>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full rounded-lg border border-gray-500 px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:outline-none"
              >
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes</option>
              </select>
            )}
          />
        </div>

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
