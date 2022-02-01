import React from 'react';
import '../styles/Search.css'

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="Search">
    <input 
      type="text" 
      value={search} 
      ref={searchInput} 
      onChange={handleSearch}
      placeholder='Busca...'
    />
  </div>
  );
};

export default Search;