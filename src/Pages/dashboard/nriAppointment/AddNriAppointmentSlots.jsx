import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNriSlotsSchema } from "../../../validations/addNriSlots.schema";
import CustomInputDate from "../../../components/controls/CustomInputDate";
import CustomTextInput from "../../../components/controls/CustomInputText";
import CustomInputTextArea from "../../../components/controls/CustomInputTextArea";
import { thirtyMinSlots, oneHourSlots } from "../../../utils/slotConstants";
import axios from "axios";
import CustomInputSelect from "../../../components/controls/CustomInputSelect";

export default function AddNriSlots({ handleClose }) {
  const { control, handleSubmit, watch, reset, setValue } = useForm({
    resolver: yupResolver(addNriSlotsSchema),
  });

  const required = true;
  const duration = watch("duration");
  const slotsTemplate = duration === 30 ? thirtyMinSlots : oneHourSlots;

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [slotErr, setSlotErr] = useState("");

  const toggleSlot = (value) => {
    setSelectedSlots((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
    setSlotErr("");
  };

  const onSubmit = async (data) => {
    const totalSlots = Number(data.total_appointments);

    if (!totalSlots || selectedSlots.length !== totalSlots) {
      setSlotErr(
        !totalSlots
          ? "Please specify the total number of slots."
          : `You must select exactly ${totalSlots} slot(s).`,
      );
      return;
    }
    const updatedSlots = selectedSlots.map((slot) => {
      const value = slot.split(" - ");
      return { start_time: value[0], end_time: value[1] };
    });
    const payload = { ...data, slots: updatedSlots };
    try {
      await axios.post("http://localhost:4000/api/nriAppointment", payload);
      setSelectedSlots([]);
      reset();
      handleClose();
    } catch (err) {
      setSlotErr("Failed to save. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        {/* Appointment Date */}
        <CustomInputDate
          control={control}
          label="Appointment Date"
          name="appointment_date"
          required={required}
        />

        {/* Total Slots */}
        <CustomTextInput
          control={control}
          name="total_appointments"
          label="Total Slots"
          placeholder="e.g., 3"
          required={required}
        />

        {/* Duration */}
        <CustomInputSelect
          control={control}
          name="duration"
          label="Duration"
          options={[
            { label: "30 Minutes", value: 30 },
            { label: "60 Minutes", value: 60 },
          ]}
          defaultValue={30}
          required={required}
          onChange={(e) => {
            setSelectedSlots([]);
            setValue("duration", e.target.value);
          }}
        />

        {/* Price */}
        <CustomTextInput
          control={control}
          name="price"
          label="Price"
          placeholder="Enter price"
          defaultValue={1000}
          disabled
        />

        {/* Notes */}
        <CustomInputTextArea
          control={control}
          name="notes"
          label="Notes"
          placeholder="Additional details about the appointment"
        />

        {/* Slots Selection */}
        <div>
          <p className="mb-3 font-medium text-gray-700">
            Select Slots ({duration}-minute intervals){" "}
            <span className="text-red-500">*</span>
            <span className="ml-3 text-gray-400">
              {selectedSlots.length} selected
            </span>
          </p>
          <div className="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto rounded-lg border p-3">
            {slotsTemplate.map((slot, idx) => (
              <label
                key={idx}
                className="inline-flex cursor-pointer items-center space-x-2"
              >
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
          <p className="text-red-500">{slotErr}</p>
        </div>

        {/* Submit */}
        <div className="sticky right-0 bottom-0 left-0 border-t border-gray-300 bg-white py-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 py-2 font-semibold text-white transition hover:bg-amber-700"
          >
            Create Slots
          </button>
        </div>
      </form>
    </div>
  );
}
