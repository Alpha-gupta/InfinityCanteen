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
  body("College").isString().notEmpty().withMessage("College must be a string"),
  handleValidationErrors,
];


export const validateMyRestaurantRequest = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("Restaurant Name must be a string"),
  body("Collegecity")
    .isString()
    .notEmpty()
    .withMessage("College City must be a string"),
  body("deliveryPrice")
    .isFloat({ min : 0})
    
    .withMessage("Delivery Price must be a number"),
  body("estimatedDeliveryTime")
    .isInt({ min : 0})
    
    .withMessage("Estimated Delivery Time must be a number"),
  body("dishes")
    .isArray()
  .withMessage("Dishes must be an array of strings").not()
    .isEmpty().withMessage("Dishes cannot be empty"),

   body("menuItems")
    .isArray()
  .withMessage("Menu Items must be an array of strings"),
    body("menuItems.*.name").notEmpty().withMessage("Menu Items name is required"),
     body("menuItems.*.price").isFloat({min :0}).withMessage("Menu Items price is required"),
  handleValidationErrors,
];