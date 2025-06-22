import { useSearchRestaurants } from "@/api/RestaurantApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import SearchBar2 from "@/components/SearchBar2";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import type { Restaurant } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState ={
    searchQuery:string;
    page: number;
}

const SearchPage = () => {

    const { Collegecity} = useParams();
const [searchState, setSearchState] =useState<SearchState>({
   searchQuery:"", 
   page:1,
});
    const { results, isPending } = useSearchRestaurants( searchState, Collegecity);

    const setPage=(page:number)=>{
        setSearchState((prevState)=>({
            ...prevState,
            page,
        }));
    };


    const setSearchQuery =(searchFormData: SearchForm)=> {
        setSearchState((prevState)=> ({
            ...prevState,
            searchQuery:searchFormData.searchQuery,
        }));
    };

    const resetSearch=()=>  {
         setSearchState((prevState)=> ({
            ...prevState,
            searchQuery:"",
            page:1,
        }));
    }
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
        <SearchBar2
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by dishes or Restaurant Name"
          onReset={resetSearch}
        />
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
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;