import * as yup from "yup";

const createPostSchema = yup.object({
  body: yup.object({
    title: yup.string().min(4).max(26).required(),
    body: yup.string().min(15).max(700).required(),
  }),
});

export { createPostSchema };
