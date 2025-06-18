import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { dishesList } from "@/config/restaurant-options-config";

import { useFormContext } from "react-hook-form";
import DishesCheckbox from "./dishesCheckbox";


const dishesSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">dishes</h2>
        <FormDescription>
          Select the dishes that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="dishes"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {dishesList.map((dishesItem) => (
                <DishesCheckbox dishes={dishesItem} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default dishesSection;