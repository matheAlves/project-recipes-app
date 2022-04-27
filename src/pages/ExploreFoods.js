import React from 'react';
import { useHistory } from 'react-router-dom';

function ExploreFoods() {
  const history = useHistory();
  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('') }
      >
        Surprise me!
      </button>
    </div>
  );
}

export default ExploreFoods;
