import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  dishes: string;
  field: ControllerRenderProps<FieldValues, "dishes">;
};

const dishesCheckbox = ({ dishes, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(dishes)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, dishes]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== dishes)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{dishes}</FormLabel>
    </FormItem>
  );
};
export default dishesCheckbox;