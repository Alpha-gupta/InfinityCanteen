import type { Key } from "react";

export type User = {
  _id: string;
  email: string;
  name: string;
 phoneNumber: string; // addressLine1: string;
 roomNumber:string ; // city: string;
 HostelName:string; //country: string;
 College:string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};
export type Restaurant = {
  id: Key | null | undefined;
  _id: string;
  restaurantName: string;
  Collegecity: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  dishes: string[];
  menuItems:MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};