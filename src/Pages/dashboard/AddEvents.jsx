import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomTextInput from "../../components/controls/CustomInutText";
import CustomInputTextArea from "../../components/controls/CustomInputTextArea";
import CustomInputDate from "../../components/controls/CustomInputDate";
import CustomTimeInput from "../../components/controls/CustomInputTime";

import { addEventSchema } from "../../validations/addLiveEvents";

const AddEvents = () => {
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(addEventSchema),
  });

  const onSubmit = (data) => {
    console.log("Event Submitted:", data);
    reset();
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-bold">Add New Event</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-2 gap-4"
      >
        <CustomTextInput
          name="name"
          control={control}
          label="Event Name"
          placeholder="e.g., Ganesh Visarjan"
          required
          className="col-span-2"
        />

        <CustomInputTextArea
          name="description"
          control={control}
          label="Event Description"
          placeholder="Brief about the event"
          required
          className="col-span-2"
        />

        <CustomInputDate
          name="date"
          control={control}
          label="Event Date"
          required
        />

        <CustomTimeInput
          name="time"
          control={control}
          label="Event Time"
          required
        />

        <CustomTextInput
          name="location"
          control={control}
          label="Location"
          placeholder="e.g., Rameshwar Temple"
          required
          className="col-span-2"
        />

        <CustomTextInput
          name="link"
          control={control}
          label="Live Link"
          placeholder="abc.youtube.com"
          required
          className="col-span-2"
        />

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 py-2 font-semibold text-white hover:bg-amber-700"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvents;
