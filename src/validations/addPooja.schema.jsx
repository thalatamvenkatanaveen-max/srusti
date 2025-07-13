import * as yup from "yup";

export const addPoojaSchema = yup.object().shape({
  name: yup.string().required("Pooja Name is required"),
  description: yup.string().required("Description is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  duration: yup.string().required("Duration is required"),
  type: yup.string().required("Pooja type is required"),
});
