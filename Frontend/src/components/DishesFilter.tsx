import { dishesList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "./ui/button";
import type { ChangeEvent } from "react";

type Props = {
  onChange: (cuisines: string[]) => void;
  selecteddishes: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const DishesFilter = ({
  onChange,
  selecteddishes,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handledishesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickeddishes = event.target.value;
    const isChecked = event.target.checked;

    const newdishesList = isChecked
      ? [...selecteddishes, clickeddishes]
      : selecteddishes.filter((dishes) => dishes !== clickeddishes);

    onChange(newdishesList);
  };

  const handledishesReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Dishes</div>
        <div
          onClick={handledishesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {dishesList
          .slice(0, isExpanded ? dishesList.length : 7)
          .map((dishes) => {
            const isSelected = selecteddishes.includes(dishes);
            return (
              <div className="flex">
                <input
                  id={`dishes_${dishes}`}
                  type="checkbox"
                  className="hidden"
                  value={dishes}
                  checked={isSelected}
                  onChange={handledishesChange}
                />
                <Label
                  htmlFor={`dishes_${dishes}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {dishes}
                </Label>
              </div>
            );
          })}

        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default DishesFilter;