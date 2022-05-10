import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';
import './CategoriesFilters.css';

function CategoriesFilter() {
  const {
    categories,
    loading,
    handleSearchByCategory,
    initialRender,
    setSelectedCategory,
    selectedCategory } = useContext(Context);
  const location = useLocation();

  function reset() {
    setSelectedCategory('ALL');
    initialRender(location.pathname);
  }

  function colorSelected() {
    if (!loading) {
      const buttons = document.querySelectorAll('.category-button');
      buttons.forEach((button) => {
        if (button.classList.contains('selected')) {
          button.classList.remove('selected');
        }
      });
      buttons.forEach((button) => {
        if (button.innerText === selectedCategory) {
          button.classList.add('selected');
        }
      });
    }
  }

  useEffect(() => {
    colorSelected();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className="filter-buttons">
      <button
        className="category-button"
        type="button"
        data-testid="All-category-filter"
        onClick={ reset }
      >
        All

      </button>
      {loading
        ? <p>Loading...</p>
        : categories.map((mealCategory) => (
          <button
            type="button"
            className="category-button"
            data-testid={ `${mealCategory.strCategory}-category-filter` }
            key={ mealCategory.strCategory }
            onClick={ handleSearchByCategory }
          >
            {mealCategory.strCategory}
          </button>))}
    </div>
  );
}

export default CategoriesFilter;
