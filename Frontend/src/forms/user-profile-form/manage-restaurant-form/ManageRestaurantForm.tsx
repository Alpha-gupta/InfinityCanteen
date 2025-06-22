import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import DishesSection from "./dishesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import PendingButton from "@/components/PendingButton";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/types";
import { useEffect } from "react";


const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "restuarant name is required",
    }),
    Collegecity: z.string({
      required_error: "Collegecity is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    dishes: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
     imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });
 type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
   restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isPending: boolean;
};

const ManageRestaurantForm = ({ onSave, isPending, restaurant}: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dishes: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

 useEffect(() => {
    if (!restaurant) {
      return;
    }

    // price lowest domination of 100 = 100pence == 1GBP
    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);



 
const onSubmit = (formDataJson: RestaurantFormData) => {

  const formData = new FormData();
  formData.append("restaurantName", formDataJson.restaurantName);
  formData.append("Collegecity", formDataJson.Collegecity);

  formData.append("deliveryPrice",formDataJson.deliveryPrice .toString());
  formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());

  formDataJson.dishes.forEach((dish, index) => {
    formData.append(`dishes[${index}]`, dish);
  });

    formDataJson.menuItems.forEach((menuitem, index) => {
    formData.append(`menuItems[${index}][name]`, menuitem.name);
        formData.append(`menuItems[${index}][price]`, menuitem.price.toString());

  });

  if (formDataJson.imageFile) {
    formData.append("imageFile", formDataJson.imageFile);
  }
  onSave(formData);
}

  return (
<Form  {...form} >
    <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-8 bg-gray-50 p-10 rounded-lg">
        <DetailsSection />

        <Separator />
        <DishesSection />
          <Separator />
          <MenuSection />
            <Separator />
            <ImageSection />

            {isPending ? <PendingButton /> : <Button type ="submit"> Submit</Button> }
    </form>

    
</Form>
  )
};

export default ManageRestaurantForm;



