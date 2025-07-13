import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomInputDate from "../../components/controls/CustomInputDate";
import CustomTextInput from "../../components/controls/CustomInutText";
import CustomTimeInput from "../../components/controls/CustomInputTime";

// ✅ Validation schema
const slotSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  numberOfSlots: yup
    .number()
    .typeError("Enter a valid number")
    .positive()
    .integer()
    .required("Number of slots is required"),
  slots: yup
    .array()
    .of(
      yup.object().shape({
        time: yup.string().required("Time is required"),
      }),
    )
    .min(1, "At least one slot is required"),
});

const AddNriSlots = () => {
  const { handleSubmit, control, watch, setValue, reset } = useForm({
    resolver: yupResolver(slotSchema),
    defaultValues: {
      date: "",
      numberOfSlots: "",
      slots: [],
    },
  });

  const numberOfSlots = watch("numberOfSlots");

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "slots",
  });

  useEffect(() => {
    if (numberOfSlots && Number(numberOfSlots) > 0) {
      const current = fields.length;
      const desired = parseInt(numberOfSlots);

      if (current < desired) {
        for (let i = current; i < desired; i++) {
          append({ time: "" });
        }
      } else if (current > desired) {
        for (let i = current - 1; i >= desired; i--) {
          remove(i);
        }
      }
    } else {
      replace([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfSlots]);

  const onSubmit = (data) => {
    console.log("Slot Data Submitted:", data);
    reset(); // Clear form after submit
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-bold">Add NRI Slots</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <CustomInputDate
          name="date"
          control={control}
          label="Select Day"
          required
        />

        <CustomTextInput
          name="numberOfSlots"
          control={control}
          label="Number of Slots"
          placeholder="e.g., 3"
          required
        />

        {fields.map((field, index) => (
          <CustomTimeInput
            key={field.id}
            name={`slots[${index}].time`}
            control={control}
            label={`Slot ${index + 1} Time`}
            required
          />
        ))}

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-amber-600 py-2 font-semibold text-white hover:bg-amber-700"
        >
          Save Slots
        </button>
      </form>
    </div>
  );
};

export default AddNriSlots;
