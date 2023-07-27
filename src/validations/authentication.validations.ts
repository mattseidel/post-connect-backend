import { check } from "express-validator";

export const registerValidation = [
  check("username", "Username is required").not().isEmpty(),
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  check("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
  check("confirmPassword", "Confirm password is required").not().isEmpty(),
  check("confirmPassword", "Passwords do not match").custom(
    (value, { req }) => value === req.body.password
  ),
];

export const loginValidation = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").not().isEmpty(),
];
