import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNriSlotsSchema } from "../../../validations/addNriSlots.schema";
import CustomInputDate from "../../../components/controls/CustomInputDate";
import CustomTextInput from "../../../components/controls/CustomInputText";
import CustomInputTextArea from "../../../components/controls/CustomInputTextArea";
import { thirtyMinSlots, oneHourSlots } from "../../../utils/slotConstants";
import axios from "axios";
import CustomInputSelect from "../../../components/controls/CustomInputSelect";
import { API_BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";

export default function AddNriSlots({
  handleClose,
  isEdit,
  selectedData,
  appointments,
  setAppointments,
}) {
  const { control, handleSubmit, watch, reset, setValue } = useForm({
    resolver: yupResolver(addNriSlotsSchema),
  });

  const required = true;
  const duration = watch("duration");
  const slotsTemplate = duration === 30 ? thirtyMinSlots : oneHourSlots;

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [slotErr, setSlotErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setValue("appointment_date", selectedData.appointment_date);
      setValue("total_appointments", selectedData.total_appointments);
      const updated = selectedData.slots.map(
        (val) => val.start_time + " - " + val.end_time,
      );
      setSelectedSlots(updated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setLoading(true);
      const id = toast.loading("Saving appointment...");
      const res = await axios.post(`${API_BASE_URL}/nriAppointment`, payload);

      setAppointments([...appointments, ...res.data.data]);
      reset();
      setSelectedSlots([]);
      handleClose();
      toast.update(id, {
        render: "Appointment created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      toast.error("Failed to save appointment. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (data) => {
    try {
      const updatedSlots = selectedSlots.map((val) => {
        const [start_time, end_time] = val.split(" - ");
        return { start_time, end_time };
      });

      const payload = {
        appointment_id: selectedData.appointment_id,
        slots: updatedSlots,
        total_appointments: data.total_appointments,
        notes: data.notes,
      };

      setLoading(true);
      const id = toast.loading("Updating appointment...");
      const res = await axios.put(`${API_BASE_URL}/nriAppointment`, payload);

      if (res.status === 200) {
        const updatedAppointments = appointments.map((appt) =>
          appt.appointment_id === selectedData.appointment_id
            ? res.data.data[0]
            : appt,
        );
        setAppointments(updatedAppointments);
        reset();
        setSelectedSlots([]);
        handleClose();
        toast.update(id, {
          render: "Appointment updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error("Failed to update appointment. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(isEdit ? onUpdate : onSubmit)}
        noValidate
        className="space-y-6"
      >
        {/* Appointment Date */}
        <CustomInputDate
          control={control}
          label="Appointment Date"
          name="appointment_date"
          required={required}
          disabled={isEdit}
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
          disabled={isEdit}
        />

        {/* Price */}
        <CustomTextInput
          control={control}
          name="price"
          label="Price"
          placeholder="Enter price"
          defaultValue={1000}
          disabled={isEdit}
        />

        {/* Slots Selection */}
        <div>
          <div className="mb-3 flex items-center justify-between font-medium text-gray-700">
            <div>
              <span> Select Slots ({duration}-minute intervals)</span>
              <span className="text-red-500"> *</span>
              <span className="ml-3 text-gray-400">
                {selectedSlots.length} selected
              </span>
            </div>
            <button
              className="cursor-pointer text-blue-400"
              onClick={() => setSelectedSlots([])}
              type="button"
            >
              clear
            </button>
          </div>

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

        {/* Notes */}
        <CustomInputTextArea
          control={control}
          name="notes"
          label="Notes"
          placeholder="Additional details about the appointment"
        />

        {/* Submit */}
        <div className="sticky right-0 bottom-0 left-0 border-t border-gray-300 bg-white py-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2 font-semibold text-white transition ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {loading ? "Please wait..." : isEdit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
