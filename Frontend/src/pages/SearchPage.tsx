// import { useSearchRestaurants } from "@/api/RestaurantApi";
// import DishesFilter from "@/components/DishesFilter";
// import PaginationSelector from "@/components/PaginationSelector";
// import SearchBar, { type SearchForm } from "@/components/SearchBar";
// import SearchBar2 from "@/components/SearchBar2";
// import SearchResultCard from "@/components/SearchResultCard";
// import SearchResultInfo from "@/components/SearchResultInfo";
// import SortOptionDropdown from "@/components/SortOptionDropdown";
// import type { Restaurant } from "@/types";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// export type SearchState ={
//     searchQuery:string;
//     page: number;
//     selecteddishes:string[];

//     sortOption:string;
// }

// const SearchPage = () => {

//     const { Collegecity} = useParams();
// const [searchState, setSearchState] =useState<SearchState>({
//    searchQuery:"", 
//    page:1,
//    selecteddishes:[],
//    sortOption:"bestMatch",
  
// });
//  const[isExpanded, setIsExpanded]= useState<boolean>(false);

//     const { results, isPending } = useSearchRestaurants( searchState, Collegecity);


//  const setSortOption =(sortOption:string) =>{
//     setSearchState((prevState)=>({
//         ...prevState,
//         sortOption,
//         page:1,
//     }));
//  };


// const setSelecteddishes = (selecteddishes: string[])=>{
//     setSearchState((prevState)=>({
//         ...prevState,
//         selecteddishes,
//         page:1,
//     }));
// };


//     const setPage=(page:number)=>{
//         setSearchState((prevState)=>({
//             ...prevState,
//             page,
//         }));
//     };


//     const setSearchQuery =(searchFormData: SearchForm)=> {
//         setSearchState((prevState)=> ({
//             ...prevState,
//             searchQuery:searchFormData.searchQuery,
//         }));
//     };

//     const resetSearch=()=>  {
//          setSearchState((prevState)=> ({
//             ...prevState,
//             searchQuery:"",
//             page:1,
//         }));
//     }
// if(isPending){
//     <span> Pending ...</span>;
// }

//     if(!results?.data || !Collegecity){
//         return <span> No results found</span>;
//     }

//     return (
// <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
//       <div id="dishes-list">
//         <DishesFilter
//           selecteddishes={searchState.selecteddishes}
//           onChange={setSelecteddishes}
//           isExpanded={isExpanded}
//           onExpandedClick={() =>
//             setIsExpanded((prevIsExpanded) => !prevIsExpanded)
//      }
//         />
//       </div>
//       <div id="main-content" className="flex flex-col gap-5">
//         <SearchBar2
//           searchQuery={searchState.searchQuery}
//           onSubmit={setSearchQuery}
//           placeHolder="Search by dishes or Restaurant Name"
//           onReset={resetSearch}
//         />
//         <div className="flex justify-between flex-col gap-3 lg:flex-row">
//           <SearchResultInfo total={results.pagination.total} Collegecity={Collegecity} />
//           <SortOptionDropdown
//             sortOption={searchState.sortOption}
//             onChange={(value) => setSortOption(value)}
//           />
//         </div>

//         {results.data.map((restaurant: Restaurant) => (
//            <SearchResultCard restaurant={restaurant} />
//          ))}
//         <PaginationSelector
//           page={results.pagination.page}
//           pages={results.pagination.pages}
//           onPageChange={setPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchPage;
import { useSearchRestaurants } from "@/api/RestaurantApi";
import DishesFilter from "@/components/DishesFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar2 from "@/components/SearchBar2";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import type { Restaurant } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selecteddishes: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { Collegecity } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selecteddishes: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isPending } = useSearchRestaurants(searchState, Collegecity);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelecteddishes = (selecteddishes: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selecteddishes,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: { searchQuery: string }) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isPending) {
    return <span>Pending ...</span>;
  }

  if (!results?.data || !Collegecity) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="dishes-list">
        <DishesFilter
          selecteddishes={searchState.selecteddishes}
          onChange={setSelecteddishes}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>

      <div
        id="main-content"
        className="flex flex-col gap-5 px-3 lg:px-6 w-full max-w-[95%] xl:max-w-[1000px] transition-all duration-300 ease-in-out"
      >
        <SearchBar2
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by dishes or Restaurant Name"
          onReset={resetSearch}
        />

        <div className="flex justify-between flex-col gap-3 lg:flex-row lg:items-center">
          <SearchResultInfo
            total={results.pagination.total}
            Collegecity={Collegecity}
          />
          <div className="lg:ml-4">
            <SortOptionDropdown
              sortOption={searchState.sortOption}
              onChange={(value) => setSortOption(value)}
            />
          </div>
        </div>

        {results.data.map((restaurant: Restaurant) => (
          <SearchResultCard key={restaurant.id} restaurant={restaurant} />
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
