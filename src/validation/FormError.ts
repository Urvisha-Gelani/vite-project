import * as Yup from "yup";

export const postSchema = Yup.object({
  userId: Yup.number().required("Required"),
  title: Yup.string()
    .max(500, "Must be 500 characters or less")
    .required("Required"),
  body: Yup.string()
    .max(1000, "Must be 1000 characters or less")
    .required("Required"),
});

export const FormValidationSchema = Yup.object({
  inDateTime: Yup.date().required("In date and time is required"),
  outDateTime: Yup.date()
    .min(
      Yup.ref("inDateTime"),
      "Out date and time cannot be before in date and time"
    )
    .required("Out date and time is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});