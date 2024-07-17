import * as Yup from "yup";

export const postSchema = Yup.object({
  title: Yup.string()
    .max(500, "Must be 500 characters or less")
    .required("Required"),
  body: Yup.string()
    .max(1000, "Must be 1000 characters or less")
    .required("Required"),
});
