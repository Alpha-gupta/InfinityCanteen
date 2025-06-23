import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Minus, Plus } from "lucide-react";
import type { MenuItem as MenuItemType } from "../types";

type Props = {
  menuItem: MenuItemType;
  quantity: number;
  increment: () => void;
  decrement: () => void;
};

const MenuItem = ({ menuItem, quantity, increment, decrement }: Props) => {
  return (
    <Card className="p-4 flex flex-col gap-4 shadow-md rounded-2xl bg-white">
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-semibold">{menuItem.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-center p-0">
        <span className="text-green-700 font-bold text-lg">₹{menuItem.price}</span>

        <div className="flex items-center gap-2">
          {quantity === 0 ? (
            <Button size="sm" onClick={increment}>
              Add
            </Button>
          ) : (
            <>
              <Button size="icon" variant="outline" onClick={decrement}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-6 text-center">{quantity}</span>
              <Button size="icon" variant="outline" onClick={increment}>
                <Plus className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItem;