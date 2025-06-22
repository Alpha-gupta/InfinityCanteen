// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form, FormControl, FormField, FormItem } from "./ui/form";
// import { Search } from "lucide-react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { useEffect } from "react";

// const formSchema = z.object({
//   searchQuery: z.string({
//     required_error: "Restaurant name is required",
//   }),
// });

// export type SearchForm = z.infer<typeof formSchema>;

// type Props = {
//   onSubmit: (formData: SearchForm) => void;
//   placeHolder: string;
//   onReset?: () => void;
//   searchQuery?: string;
// };

// const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
//   const form = useForm<SearchForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       searchQuery,
//     },
//   });

//   useEffect(() => {
//     form.reset({ searchQuery });
//   }, [form, searchQuery]);

//   const handleReset = () => {
//     form.reset({
//       searchQuery: "",
//     });

//     if (onReset) {
//       onReset();
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
//           form.formState.errors.searchQuery && "border-red-500"
//         }`}
//       >
//         <Search
//           strokeWidth={2.5}
//           size={30}
//           className="ml-1 text-orange-500 hidden md:block"
//         />
//         <FormField
//           control={form.control}
//           name="searchQuery"
//           render={({ field }) => (
//             <FormItem className="flex-1">
//               <FormControl>
//                 <Input
//                   {...field}
//                   className="border-none shadow-none text-xl focus-visible:ring-0"
//                   placeholder={placeHolder}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <Button
//           onClick={handleReset}
//           type="button"
//           variant="outline"
//           className="rounded-full"
//         >
//           Reset
//         </Button>
//         <Button type="submit" className="rounded-full bg-orange-500">
//           Search
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default SearchBar;

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form, FormControl, FormField, FormItem } from "./ui/form";
// import { Search } from "lucide-react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { useEffect } from "react";

// const formSchema = z.object({
//   searchQuery: z.string({
//     required_error: "Restaurant name is required",
//   }),
// });

// export type SearchForm = z.infer<typeof formSchema>;

// type Props = {
//   onSubmit: (formData: SearchForm) => void;
//   placeHolder: string;
//   onReset?: () => void;
//   searchQuery?: string;
// };

// const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
//   const form = useForm<SearchForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       searchQuery,
//     },
//   });

//   useEffect(() => {
//     form.reset({ searchQuery });
//   }, [form, searchQuery]);

//   const handleReset = () => {
//     form.reset({
//       searchQuery: "",
//     });

//     if (onReset) {
//       onReset();
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className={`flex items-center justify-between gap-2 border-2 rounded-full px-4 py-2 bg-white max-w-4xl w-full mx-auto transition-all duration-300 shadow-sm ${
//           form.formState.errors.searchQuery ? "border-red-500" : "border-gray-200"
//         }`}
//       >
//         <Search
//           strokeWidth={2.5}
//           size={24}
//           className="text-orange-500 hidden md:block"
//         />

//         <FormField
//           control={form.control}
//           name="searchQuery"
//           render={({ field }) => (
//             <FormItem className="flex-1">
//               <FormControl>
//                 <Input
//                   {...field}
//                   className={`w-full bg-transparent border-none shadow-none focus-visible:ring-0 placeholder-gray-500 text-base font-medium transition-all duration-200 ${
//                     field.value ? "text-lg" : "text-base"
//                   }`}
//                   placeholder={placeHolder}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <Button
//           onClick={handleReset}
//           type="button"
//           variant="outline"
//           className="rounded-full px-4 py-1 text-sm"
//         >
//           Reset
//         </Button>
//         <Button type="submit" className="rounded-full bg-orange-500 px-6 py-2 text-sm">
//           Search
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default SearchBar;
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {collegeMap} from "../data/CollegeMap";

// const formSchema = z.object({
//   searchQuery: z.string({
//     required_error: "Restaurant name is required",
//   }),
// });

// export type SearchForm = z.infer<typeof formSchema>;

// type Props = {
//   onSubmit: (formData: SearchForm) => void;
//   placeHolder: string;
//   onReset?: () => void;
//   searchQuery?: string;
// };

// const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
//   const form = useForm<SearchForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       searchQuery: "",
//     },
//   });

//   const navigate = useNavigate();
//   const searchValue = form.watch("searchQuery");

//   const matchingColleges = useMemo(() => {
//     if (!searchValue) return [];
//     const lowercaseSearch = searchValue.toLowerCase();
//     return Object.entries(collegeMap)
//       .filter(([city]) => city.includes(lowercaseSearch))
//       .slice(0, 5);
//   }, [searchValue]);

//   useEffect(() => {
//     form.reset({ searchQuery });
//   }, [form, searchQuery]);

//   const handleReset = () => {
//     form.reset({
//       searchQuery: "",
//     });
//     if (onReset) {
//       onReset();
//     }
//   };

//   return (
//     <Form {...form}>
//     <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
//         form.formState.errors.searchQuery && "border-red-500"
//         }`}
//     >
//         <Search
//         strokeWidth={2.5}
//         size={30}
//         className="ml-1 text-orange-500 hidden md:block"
//         />

//         <FormField
//         control={form.control}
//         name="searchQuery"
//         render={({ field }) => (
//             <FormItem className="flex-1 relative">
//             <FormControl>
//                 <Input
//                 {...field}
//                 className="border-none shadow-none text-xl focus-visible:ring-0"
//                 placeholder={placeHolder}
//                 autoComplete="off"
//                 />
//             </FormControl>

//             {matchingColleges.length > 0 && (
//                 <Card className="absolute top-full mt-2 w-full z-10 shadow-lg">
//                 <ScrollArea className="max-h-60 rounded-md">
//                     <CardContent className="p-0 divide-y divide-muted">
//                     {matchingColleges.map(([city, college], i) => (
//                         <div
//                         key={i}
//                         onClick={() => {
//                             form.setValue("searchQuery", city);
//                             navigate(`/search/${city}`);
//                         }}
//                         className="px-4 py-3 text-base cursor-pointer font-medium hover:bg-orange-100 transition-colors"
//                         >
//                         {college}
//                         </div>
//                     ))}
//                     </CardContent>
//                 </ScrollArea>
//                 </Card>
//             )}
//             </FormItem>
//         )}
//         />

//         {searchValue && (
//         <Button
//             onClick={handleReset}
//             type="button"
//             variant="outline"
//             className="rounded-full"
//         >
//             Reset
//         </Button>
//         )}
        
//         <Button type="submit" className="rounded-full bg-orange-500">
//         Search
//         </Button>
//     </form>
//     </Form>
//   );
// };

// export default SearchBar;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { collegeMap } from "../data/CollegeMap";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery: string;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  const navigate = useNavigate();
  const searchValue = form.watch("searchQuery");

  const matchingColleges = useMemo(() => {
    if (!searchValue) return [];
    const lowercaseSearch = searchValue.toLowerCase();
    return Object.entries(collegeMap)
      .filter(([city]) => city.includes(lowercaseSearch))
      .slice(0, 5);
  }, [searchValue]);

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-1 justify-between flex-row border-2 rounded-full px-3 py-2 bg-white shadow-sm focus-within:shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.02] text-sm w-[420px] mx-auto ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2}
          size={20}
          className="text-orange-500 hidden md:block"
        />

        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-sm font-medium text-gray-800 focus-visible:ring-0 focus:outline-none placeholder:text-gray-400 transition-all duration-200 h-8"
                  placeholder={placeHolder}
                  autoComplete="off"
                />
              </FormControl>

              {matchingColleges.length > 0 && (
                <Card className="absolute top-full mt-1 w-full z-10 shadow-lg rounded-md bg-white border border-gray-200">
                  <ScrollArea className="max-h-52 rounded-md">
                    <CardContent className="p-0 divide-y divide-muted">
                      {matchingColleges.map(([city, college], i) => (
                        <div
                          key={i}
                          onClick={() => {
                            form.setValue("searchQuery", city);
                            navigate(`/search/${city}`);
                          }}
                          className="px-3 py-2 text-sm cursor-pointer font-semibold text-gray-700 hover:bg-orange-100 transition-colors duration-150"
                        >
                          {college}
                        </div>
                      ))}
                    </CardContent>
                  </ScrollArea>
                </Card>
              )}
            </FormItem>
          )}
        />

        {searchValue && (
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-full text-xs px-2 py-1 font-medium"
          >
            Reset
          </Button>
        )}

        <Button
          type="submit"
          className="rounded-full bg-orange-500 hover:bg-orange-600 transition-colors duration-150 text-xs px-3 py-1 font-semibold"
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
