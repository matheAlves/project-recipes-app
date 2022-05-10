import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard(props) {
  const { recipe, index } = props;

  const shareRecipe = () => {
    const { link } = recipe;
    document.getElementById('link-copied').innerHTML = 'Link copied!';
    return (navigator.clipboard.writeText(link));
  };

  const shareRecipeDrink = () => {
    const { link } = recipe;
    document.getElementById('link-copiede').innerHTML = 'Link copied!';
    return (navigator.clipboard.writeText(link));
  };

  if (recipe.typed === 'meal') {
    return (
      <div key={ recipe.name }>
        <Link to={ recipe.copyLink }>
          <img
            src={ recipe.image }
            alt="recipe"
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.nationality}
          {' '}
          -
          {' '}
          {recipe.category}
        </p>
        <Link to={ recipe.copyLink }>
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>
          Done recipe in :
          {recipe.doneDate}
        </p>
        <button
          type="button"
          onClick={ shareRecipe }
        >
          <img
            className="img-share"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share_icon"
          />
        </button>
        <p id="link-copied" />
        <p>{recipe.type}</p>
        <p key={ index } data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
          {recipe.tags}
        </p>
        <p key={ index } data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
          {recipe.tags}
        </p>
        {/* <div>
          {recipe.tags.map((tag, indx) => (
            <p key={ indx } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </p>
          ))}
        </div> */}
      </div>
      // ))
    );
  }
  if (recipe.typed === 'drink') {
    return (
      <div key={ recipe.name }>
        <Link to={ recipe.copyLink }>
          <img
            src={ recipe.image }
            alt="recipe"
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.alcoholicOrNot}
          {' '}
          {recipe.category}
        </p>
        <Link to={ recipe.copyLink }>
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>
          Done recipe in :
          {recipe.doneDate}
        </p>
        <button
          type="button"
          onClick={ shareRecipeDrink }
        >
          <img
            className="img-share"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share_icon"
          />
        </button>
        <p id="link-copiede" />
        <p>{recipe.type}</p>
      </div>
      // ))
    );
  }
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.node.isRequired,
};

export default DoneRecipeCard;
