import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard() {
  // const { doneRecipes } = props;
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const shareRecipe = (recipe) => {
    const { link } = recipe;
    // document.getElementById('link-copied').innerHTML = 'Link copied!';
    return (navigator.clipboard.writeText(link));
  };

  return (
    doneRecipes.map((recipe, index) => (
      <div key={ index }>
        <img
          src={ recipe.image }
          alt="recipe"
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.alcoholicOrNot}
          {' '}
          {recipe.nationality}
          {' '}
          -
          {' '}
          {recipe.category}
        </p>
        <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
        <p data-testid={ `${index}-horizontal-done-date` }>
          Done recipe in :
          {recipe.doneDate}
        </p>
        <button
          type="button"
          onClick={ shareRecipe(recipe) }
        >
          <img
            className="img-share"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share_icon"
          />
        </button>
        <p id="link-copied" />
        <p>{recipe.type }</p>
        <p key={ index } data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
          {recipe.tags[0]}
        </p>
        <p key={ index } data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
          {recipe.tags[1]}
        </p>
      </div>
    ))
  );
}

export default DoneRecipeCard;
