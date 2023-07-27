import { check } from "express-validator";

export const postValidations = [
  check("title", "title is required").not().isEmpty(),
  check('title', 'title must be at least 5 chars long').isLength({ min: 5 }),
  check("body", "body is required").not().isEmpty(),
  check('body', 'body must be at least 10 chars long').isLength({ min: 10 }),
];
