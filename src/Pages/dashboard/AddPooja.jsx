import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomTextInput from "../../components/controls/CustomInutText";
import CustomInputTextArea from "../../components/controls/CustomInputTextArea";
import CustomInputDate from "../../components/controls/CustomInputDate";
import CustomTimeInput from "../../components/controls/CustomInputTime";

import { addPoojaSchema } from "../../validations/addPooja.schema";

export default function AddPooja() {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(addPoojaSchema),
  });

  const onSubmit = (data) => {
    console.log("Pooja Data:", data);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-bold">Add New Pooja</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-2 gap-4"
      >
        <CustomTextInput
          name="name"
          control={control}
          label="Pooja Name"
          placeholder="e.g., Rudrabhishek"
          required
          className="col-span-2"
        />

        <CustomInputTextArea
          name="description"
          control={control}
          label="Description"
          placeholder="Describe the pooja"
          required
          className="col-span-2"
        />

        <CustomInputDate
          name="date"
          control={control}
          label="Pooja Date"
          required
        />

        <CustomTimeInput
          name="time"
          control={control}
          label="Pooja Time"
          required
        />

        <CustomTextInput
          name="price"
          control={control}
          label="Price (INR)"
          placeholder="Enter price"
          type="number"
          required
        />

        <CustomTextInput
          name="duration"
          control={control}
          label="Duration"
          placeholder="e.g., 2 hours"
          required
        />

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 py-2 font-semibold text-white hover:bg-amber-700"
          >
            Add Pooja
          </button>
        </div>
      </form>
    </div>
  );
}
