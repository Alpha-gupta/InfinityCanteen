import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-gray-800">Restaurant Information</h2>
        <p className="text-sm text-gray-500">
          Enter your restaurant details to get started
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Restaurant Name */}
        <FormField
          control={control}
          name="restaurantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Restaurant Name *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="bg-gray-50 border-gray-200 focus:bg-white"
                  placeholder="e.g., Campus Bistro"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* College City */}
        <FormField
          control={control}
          name="Collegecity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">College City *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="bg-gray-50 border-gray-200 focus:bg-white"
                  placeholder="e.g., Boston"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery Price */}
        <FormField
  control={control}
  name="deliveryPrice"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-gray-700">Delivery Fee (₹) *</FormLabel>
      <FormControl>
        <Input 
          {...field} 
          type="number"
          min="0"
          step="10"  // Common increments for INR (10, 20, 50 etc.)
          className="bg-gray-50 border-gray-200 focus:bg-white"
          placeholder="50"  // Typical delivery fee in INR
        />
      </FormControl>
      <FormMessage className="text-xs" />
    </FormItem>
  )}
/>
        
        {/* Estimated Delivery Time */}
        <FormField
          control={control}
          name="estimatedDeliveryTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Delivery Time (minutes) *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="number"
                  min="5"
                  className="bg-gray-50 border-gray-200 focus:bg-white"
                  placeholder="30"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DetailsSection;