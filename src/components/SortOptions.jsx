import React from "react";
import { ChevronDown } from "lucide-react";

const SortOptions = ({ sort, setSort }) => {
  return (
    <div className="relative">
      <select
        className="appearance-none pl-3 pr-8 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        onChange={(e) => setSort(e.target.value)}
        value={sort}
      >
        <option value="">Sort: Recommended</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
     
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <ChevronDown size={18} />
      </div>
    </div>
  );
};

export default SortOptions;
