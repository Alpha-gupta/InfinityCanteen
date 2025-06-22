// import { SearchState } from "@/pages/SearchPage";
// import { Restaurant, RestaurantSearchResponse } from "@/types";
// import { useQuery } from "react-query";

import type { SearchState } from "@/pages/SearchPage";
import type { RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useGetRestaurant = (restaurantId?: string) => {
//   const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
//     const response = await fetch(
//       `${API_BASE_URL}/api/restaurant/${restaurantId}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to get restaurant");
//     }

//     return response.json();
//   };

//   const { data: restaurant, isLoading } = useQuery(
//     "fetchRestaurant",
//     getRestaurantByIdRequest,
//     {
//       enabled: !!restaurantId,
//     }
//   );

//   return { restaurant, isLoading };
// };

export const useSearchRestaurants = (
   searchState: SearchState,
  Collegecity?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
     const params = new URLSearchParams();
     params.set("searchQuery", searchState.searchQuery);
     params.set("page", searchState.page.toString());
     //params.set("selecteddishes", searchState.selecteddishes.join(","));
    // params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${Collegecity}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isPending } = useQuery({
    queryKey: ["searchRestaurants", searchState],
    queryFn: createSearchRequest,
    enabled: !!Collegecity,
  });

  return {
    results,
    isPending,
  };
};