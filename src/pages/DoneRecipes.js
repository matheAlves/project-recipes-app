import React from 'react';
import { Link } from 'react-router-dom';
// import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';

function DoneRecipes() {
  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  // console.log(doneRecipes);

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <Link to="/foods">
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
      </Link>
      <Link to="/drinks">
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
      </Link>
      {/* <DoneRecipeCard /> */}
    </div>
  );
}

export default DoneRecipes;
