import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';

function DoneRecipes() {
  const [dones, setDones] = useState();

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDones(doneRecipes);
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
      </Link>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drink
      </button>
      {!dones
        ? <h1>No done recipes saved</h1>
        : (
          <>
            {dones.map(
              (recipe, index) => (
                <DoneRecipeCard
                  key={ index }
                  recipe={ recipe }
                  index={ index }
                />
              ),
            )}
          </>
        )}
    </div>
  );
}
export default DoneRecipes;
