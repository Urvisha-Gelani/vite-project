import * as Yup from "yup";

export const postSchema = Yup.object({
  title: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  body: Yup.string()
    .max(200, "Must be 200 characters or less")
    .required("Required"),
});
