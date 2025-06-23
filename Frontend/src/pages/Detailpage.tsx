import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { MenuItem as MenuItemType } from "../types";

export type CartItem = {
  _id: string;
  name: string; 
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isPending } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
        const existing = prevCartItems.find(item => item._id === menuItem._id);
        if (!existing) return prevCartItems;

        let updated;
        if (existing.quantity > 1) {
        updated = prevCartItems.map(item =>
            item._id === menuItem._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        } else {
        updated = prevCartItems.filter(item => item._id !== menuItem._id);
        }

        sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updated)
        );
        return updated;
        });
    };



  if (isPending || !restaurant) {
    return "Pending...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
                key={menuItem._id}
                menuItem={menuItem}
                quantity={
                    cartItems.find((item) => item._id === menuItem._id)?.quantity || 0
                }
                increment={() => addToCart(menuItem)}
                decrement={() => removeFromCart(menuItem)}
            />

          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;