import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import type { Restaurant } from "@/types";
import { useParams } from "react-router-dom";



const SearchPage = () => {

    const { Collegecity} = useParams();

    const { results, isPending } = useSearchRestaurants(Collegecity);
if(isPending){
    <span> Pending ...</span>;
}

    if(!results?.data || !Collegecity){
        return <span> No results found</span>;
    }

    return (
<div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="dishes-list">
        {/* <dishesFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        /> */}
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        {/* <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        /> */}
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} Collegecity={Collegecity} />
          {/* <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          /> */}
        </div>

        {results.data.map((restaurant: Restaurant) => (
           <SearchResultCard restaurant={restaurant} />
         ))}
        {/* <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        /> */}
      </div>
    </div>
  );
};

export default SearchPage;