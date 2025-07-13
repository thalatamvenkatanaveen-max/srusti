import * as yup from "yup";

export const addFestivalSchema = yup.object().shape({
  name: yup.string().required("Festival name is required"),
  description: yup.string().required("Description is required"),
  date: yup.string().required("Festival date is required"),
});
