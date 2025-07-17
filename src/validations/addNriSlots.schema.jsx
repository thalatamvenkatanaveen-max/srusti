import * as yup from "yup";

export const addNriSlotsSchema = yup.object().shape({
  date: yup.string().required("Appointment date is required"),

  totalSlots: yup
    .number()
    .typeError("Total slots must be a number")
    .positive("Slots must be greater than zero")
    .integer("Slots must be an integer")
    .required("Total slots is required"),
});
