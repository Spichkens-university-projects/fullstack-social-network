import { ChangeEvent, useState } from "react";
import useDebounce from "./useDebounce";

const useSearch = (apiQuery: any) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceSearch = useDebounce(searchTerm, 500);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { data, isSuccess, error, status, isFetching, isLoading } =
    apiQuery(debounceSearch);

  return { handleSearch, data, isSuccess, searchTerm, isFetching };
};

export default useSearch;
