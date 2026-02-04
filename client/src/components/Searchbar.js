
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// --- IMPORT STYLES ---
import { searchbarStyles } from "../styles/SearchbarStyles";

function Searchbar({ setSearchValue, handleSearch }) {
  return (
    <div className={searchbarStyles.container}>
      
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search for shoes, phones, laptops..."
        className={searchbarStyles.input}
        
        // 1. Update value instantly
        onChange={(e) => setSearchValue(e.target.value)}
        
        // 2. Allow 'Enter' key to trigger search (optional since filter is instant)
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        }}
      />
      
      {/* Search Button (Circle) */}
      <button 
        onClick={handleSearch}
        className={searchbarStyles.searchBtn}
        aria-label="Search"
      >
        <FontAwesomeIcon icon={faSearch} className={searchbarStyles.btnIcon} />
      </button>

    </div>
  );
}

export default Searchbar;