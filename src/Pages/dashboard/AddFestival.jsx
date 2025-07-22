import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomTextInput from "../../components/controls/CustomInputText";
import CustomInputTextArea from "../../components/controls/CustomInputTextArea";
import CustomInputDate from "../../components/controls/CustomInputDate";

import { addFestivalSchema } from "../../validations/addFestival.schema";

const AddFestival = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(addFestivalSchema),
  });

  const onSubmit = (data) => {
    console.log("Festival Data:", data);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-bold">Add New Festival</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-2 gap-4"
      >
        <CustomTextInput
          name="name"
          control={control}
          label="Festival Name"
          placeholder="e.g., Diwali"
          required
          className="col-span-2"
        />

        <CustomInputTextArea
          name="description"
          control={control}
          label="Festival Description"
          placeholder="Details about the festival"
          required
          className="col-span-2"
        />

        <CustomInputDate
          name="date"
          control={control}
          label="Festival Date"
          required
        />

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 py-2 font-semibold text-white hover:bg-amber-700"
          >
            Add Festival
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFestival;
