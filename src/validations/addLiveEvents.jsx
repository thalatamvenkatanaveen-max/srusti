import * as yup from "yup";

export const addEventSchema = yup.object().shape({
  name: yup.string().required("Event name is required"),
  description: yup.string().required("Description is required"),
  date: yup.string().required("Event date is required"),
  time: yup.string().required("Event time is required"),
  location: yup.string().required("Location is required"),
  link: yup.string().required("Link is required"),
});
