import * as yup from "yup";

export const emailHoroscopeSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.string().required("Date of Birth is required"),
  placeOfBirth: yup.string().required("Place of Birth is required"),
  time: yup.string().required("Time of Birth is required"),
  additionalNotes: yup.string().optional(),
});
