import * as yup from "yup";

export const nriAppointmentSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().required("Mobile number is required"),
  country: yup.string().required("Country is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.string().required("Date of Birth is required"),
  placeOfBirth: yup.string().required("Place of Birth is required"),
  time: yup.string().required("Time of Birth is required"),
});
