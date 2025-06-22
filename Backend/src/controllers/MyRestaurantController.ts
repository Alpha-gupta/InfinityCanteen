// import { Request, Response } from "express";

// import cloudinary from "cloudinary";
// import mongoose from "mongoose";
// import Restaurant from "../models/restaurants";
// import { get } from "http";


// const getMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const restaurant = await Restaurant.findOne({ user: req.userId });
//     if (!restaurant) {
//       return res.status(404).json({ message: "restaurant not found" });
//     }
//     res.json(restaurant);
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ message: "Error fetching restaurant" });
//   }
// };

// const createMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const existingRestaurant = await Restaurant.findOne({ user: req.userId });

//     if (existingRestaurant) {
//       return res.status(409).json({ message: "User restaurant already exists" });
//     }

//  console.log("REQ.BODY:", req.body);      // Check if Collegecity exists
// console.log("REQ.FILE:", req.file);      // Check uploaded image


//     const imageUrl = await uploadImage(req.file as Express.Multer.File);

//     const restaurant = new Restaurant(req.body);
//     restaurant.imageUrl = imageUrl;
//     restaurant.user = new mongoose.Types.ObjectId(req.userId);
//     restaurant.lastUpdated = new Date();
//     await restaurant.save();

//     res.status(201).send(restaurant);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };


// const updateMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const restaurant = await Restaurant.findOne({
//       user: req.userId,
//     });

//     if (!restaurant) {
//       return res.status(404).json({ message: "restaurant not found" });
//     }

//     restaurant.restaurantName = req.body.restaurantName;
//     restaurant.Collegecity = req.body.city;
//     restaurant.deliveryPrice = req.body.deliveryPrice;
//     restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
//     restaurant.dishes = req.body.cuisines;
//     restaurant.menuItems = req.body.menuItems;
//     restaurant.lastUpdated = new Date();

//     if (req.file) {
//       const imageUrl = await uploadImage(req.file as Express.Multer.File);
//       restaurant.imageUrl = imageUrl;
//     }

//     await restaurant.save();
//     res.status(200).send(restaurant);
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };


// const uploadImage = async (file: Express.Multer.File): Promise<string> => {
//     const image = file;
//     const base64Image = Buffer.from(image.buffer).toString("base64");
//     const dataURI = `data:${image.mimetype};base64,${base64Image}`;

//     const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
//     return uploadResponse.url;
// };

// export default {
//     getMyRestaurant,
//     createMyRestaurant,
//     updateMyRestaurant,
//     };

import { Request, Response } from "express";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import Restaurant from "../models/restaurants";

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res.status(409).json({ message: "User restaurant already exists" });
    }

    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);

    const {
      restaurantName,
      Collegecity,
      deliveryPrice,
      estimatedDeliveryTime,
      dishes,
      menuItems
    } = req.body;

    if (!restaurantName || !Collegecity || !deliveryPrice || !estimatedDeliveryTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const imageUrl = req.file ? await uploadImage(req.file as Express.Multer.File) : "";

    const restaurant = new Restaurant({
      restaurantName,
      Collegecity,
      deliveryPrice,
      estimatedDeliveryTime,
      dishes,
      menuItems,
      imageUrl,
      user: new mongoose.Types.ObjectId(req.userId),
      lastUpdated: new Date(),
    });

    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({
      user: req.userId,
    });

    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    const {
      restaurantName,
      Collegecity,
      deliveryPrice,
      estimatedDeliveryTime,
      dishes,
      menuItems
    } = req.body;

    restaurant.restaurantName = restaurantName;
    restaurant.Collegecity = Collegecity;
    restaurant.deliveryPrice = deliveryPrice;
    restaurant.estimatedDeliveryTime = estimatedDeliveryTime;
    restaurant.dishes = dishes;
    restaurant.menuItems = menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();
    res.status(200).send(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  getMyRestaurant,
  createMyRestaurant,
  updateMyRestaurant,
};
