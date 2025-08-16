import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative w-full sm:w-2/3">
      <input
        type="text"
        placeholder="Search products, categories or brands..."
        className="w-full py-3 pl-12 pr-4 rounded-full bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder:text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={18} />
      </div>
    </div>
  );
};

export default SearchBar;