
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Searchbar({ setSearchValue, handleSearch }) {
  return (
    <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-black w-full max-w-md">
      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 outline-none bg-black text-white placeholder-gray-400"
        
        // 1. Update value as they type
        onChange={(e) => setSearchValue(e.target.value)}
        
        // 2. Trigger search ONLY when they hit 'Enter'
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        }}
      />
      
      {/* 3. A dedicated button for the search action */}
      <button 
        onClick={handleSearch}
        className="text-white hover:text-rose-600 transition-colors duration-200 ml-2 px-2"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}

export default Searchbar;