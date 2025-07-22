import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomTextInput from "../../../components/controls/CustomInputText";
import CustomInputTextArea from "../../../components/controls/CustomInputTextArea";
import CustomInputDate from "../../../components/controls/CustomInputDate";
import CustomTimeInput from "../../../components/controls/CustomInputTime";

import { addPoojaSchema } from "../../../validations/addPooja.schema";
import axios from "axios";

export default function AddPooja() {
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(addPoojaSchema),
  });

  const onSubmit = async (data) => {
    console.log("Pooja Data:", data);
    try {
      await axios.post("http://localhost:4000/api/poojas", data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid grid-cols-2 gap-4"
    >
      <CustomTextInput
        name="poojaName"
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
        name="poojaDate"
        control={control}
        label="Pooja Date"
        required
      />

      <CustomTimeInput
        name="poojaTime"
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

      <div className="col-span-2 flex justify-center">
        <button
          type="submit"
          className="w-full rounded-lg bg-amber-600 py-2 font-semibold text-white hover:bg-amber-700"
        >
          Add Pooja
        </button>
      </div>
    </form>
  );
}
