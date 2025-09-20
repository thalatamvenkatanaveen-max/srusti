import * as yup from "yup";

export const createUserSchema = (isEdit = false) =>
  yup.object().shape({
    name: yup.string().required("Name is required"),
    mobile: yup
      .string()
      .required("Mobile is required")
      .matches(/^[0-9]{10}$/, "Mobile must be 10 digits"),

    // Email: only required in create mode
    email: isEdit
      ? yup.string().email("Invalid email").notRequired()
      : yup.string().email("Invalid email").required("Email is required"),

    // Password: only required in create mode
    password: isEdit
      ? yup.string().notRequired()
      : yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
  });
