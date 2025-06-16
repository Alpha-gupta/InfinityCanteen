import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("phoneNumber")
    .isString()
    .notEmpty()
    .withMessage("Phone Number must be a string"),
  body("roomNumber").isString().notEmpty().withMessage("Room no. must be a string"),
  body("HostelName").isString().notEmpty().withMessage("HostelName must be a string"),
  handleValidationErrors,
];
