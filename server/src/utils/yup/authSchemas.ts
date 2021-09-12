import * as yup from "yup";

/**
 * Validation schema for register body
 */
const registerSchema = yup.object({
  body: yup.object({
    username: yup.string().min(4).max(32).required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(255).required(),
  }),
});

/**
 * Validation schema for login body
 */
const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(255).required(),
  }),
});

// const forgotpasswordSchema = yup.object({
//   body: yup.object({
//     email: yup.string().email().required(),
//   }),
// });

// const resetpasswordSchema = yup.object({
//   body: yup.object({
//     password: yup.string().min(4).max(255).required(),
//   }),
// });

export { registerSchema, loginSchema };
