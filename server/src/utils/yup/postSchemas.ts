import * as yup from "yup";

const createPostSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .min(4, "Title field must be at least 4 characters long.")
      .max(26, "Title field cannot be longer than 26 characters")
      .required(),
    body: yup
      .string()
      .min(15, "Body field must be at least 15 characters long.")
      .max(700, "Body field cannot be longer than 700 characters")
      .required(),
  }),
});

export { createPostSchema };
