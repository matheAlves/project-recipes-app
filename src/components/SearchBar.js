import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';
import './SearchBar.css';

function SearchBar() {
  const { handleSearchInput, selectedRadio, setSelected,
    handleClickSearch, filterSearchInput } = useContext(Context);
  const location = useLocation();

  return (
    <div>
      <form>
        <div>
          <label htmlFor="search-input">
            <input
              type="text"
              id="search-input"
              data-testid="search-input"
              name="search-input"
              placeholder="Search Recipe"
              onChange={ handleSearchInput }
              value={ filterSearchInput }
            />
          </label>
        </div>
        <div className="search-inputs-container">
          <label htmlFor="ingredient-search-radio">
            <input
              type="radio"
              id="ingredient-search-radio"
              data-testid="ingredient-search-radio"
              name="search-radio"
              value={ selectedRadio }
              onChange={ ({ target }) => setSelected(target.id) }
            />
            Ingredient
          </label>
          <label htmlFor="name-search-radio">
            <input
              type="radio"
              id="name-search-radio"
              data-testid="name-search-radio"
              name="search-radio"
              value={ selectedRadio }
              onChange={ ({ target }) => setSelected(target.id) }
            />
            Name
          </label>
          <label htmlFor="first-letter-search-radio">
            <input
              type="radio"
              id="first-letter-search-radio"
              data-testid="first-letter-search-radio"
              name="search-radio"
              value={ selectedRadio }
              onChange={ ({ target }) => setSelected(target.id) }
            />
            First Letter
          </label>
        </div>
        <button
          className="main-search-btn"
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleClickSearch(location.pathname) }
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
