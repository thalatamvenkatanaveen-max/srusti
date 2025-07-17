import * as yup from "yup";

export const addPoojaSchema = yup.object().shape({
  poojaName: yup.string().required("Pooja Name is required"),
  description: yup.string().required("Description is required"),
  poojaDate: yup.string().required("Date is required"),
  poojaTime: yup.string().required("Time is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  duration: yup.string().required("Duration is required"),
});
