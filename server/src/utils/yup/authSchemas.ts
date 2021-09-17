import * as yup from "yup";

/**
 * Validation schema for register body
 */
const registerSchema = yup.object({
  body: yup.object({
    email: yup.string().email("Please enter a valid email.").required("Email field is required."),
    username: yup
      .string()
      .matches(/^([a-zA-Z0-9 _-]+)$/, "Username cannot have special characters in it.")
      .min(4, "Username field must be at least 4 characters long.")
      .max(32, "Username cannot be longer than 32 characters")
      .required("Username field is required."),
    password: yup
      .string()
      .min(4, "Password must have at least 4 characters.")
      .max(255, "Password cannot have more than 255 characters")
      .required(),
  }),
});

/**
 * Validation schema for login body
 */
const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().email("Please enter a valid email.").required("Email field is required."),
    password: yup
      .string()
      .min(4, "Password must have at least 4 characters.")
      .max(255, "Password cannot have more than 255 characters")
      .required(),
  }),
});

/**
 * Validation schema for forgotpassword body
 */
const forgotpasswordSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
  }),
});

/**
 * Validation schema for resetpassword body
 */
const resetpasswordSchema = yup.object({
  body: yup.object({
    password: yup.string().min(4).max(255).required(),
  }),
});

export { registerSchema, loginSchema, forgotpasswordSchema, resetpasswordSchema };
