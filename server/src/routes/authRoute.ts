import express from "express";
/**
 * Route that handles authorization and authentication operations.
 */
const router = express.Router();

import validate from "../utils/yup/validateSchema";
import { registerSchema, loginSchema, forgotpasswordSchema, resetpasswordSchema } from "../utils/yup/authSchemas";

import { register, login, forgotpassword, resetpassword, loggedIn, logout } from "../controllers/authController";
import validateToken from "../middleware/auth";

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/forgotpassword", validate(forgotpasswordSchema), forgotpassword);

router.put("/resetpassword/:resetToken", validate(resetpasswordSchema), resetpassword);

router.get("/loggedIn", validateToken, loggedIn);

router.get("/logout", logout);

export default router;
