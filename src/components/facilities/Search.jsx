"use client";
import { Button, SearchField } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Search = ({ search: initialSearch }) => {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch || "");
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (!search) {
      params.delete("search");
    } else {
      params.set("search", search);
    }
    router.push(`?${params.toString().toLowerCase()}`);
  };
  return (
    <div className="flex items-center gap-2">
      {" "}
      <SearchField
        name="search"
        onChange={(value) => setSearch(value)}
        defaultValue={search}
      >
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-70" placeholder="Search facilities" />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
      <Button
        onClick={handleSearch}
        variant="secondary"
        className={`bg-green-500 text-white rounded-md`}
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
