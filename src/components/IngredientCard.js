import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import './IngredientCard.css';

function IngredientCard(props) {
  const { ing, type, index } = props;
  const { selectIngredient } = useContext(Context);
  const history = useHistory();

  function redirect({ target }) {
    selectIngredient(target.alt);
    if (type === 'food') {
      history.push('/project-recipes-app/foods');
    } if (type === 'drink') {
      history.push('/project-recipes-app/drinks');
    }
  }

  if (type === 'food') {
    return (
      <li
        className="ingredient-card"
        data-testid={ `${index}-ingredient-card` }
      >
        <div
          role="button"
          tabIndex={ 0 }
          onKeyDown={ redirect }
          onClick={ redirect }
        >
          <p
            alt={ ing.strIngredient }
            data-testid={ `${index}-card-name` }
          >
            {ing.strIngredient}
          </p>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png` }
            alt={ ing.strIngredient }
          />
        </div>

      </li>
    );
  } if (type === 'drink') {
    return (
      <li
        className="ingredient-card"
        data-testid={ `${index}-ingredient-card` }
      >
        <div
          role="button"
          tabIndex={ 0 }
          onKeyDown={ redirect }
          onClick={ redirect }
        >
          <p
            data-testid={ `${index}-card-name` }
            alt={ ing.strIngredient }
          >
            {ing.strIngredient1}
          </p>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ing.strIngredient1}-Small.png` }
            alt={ ing.strIngredient1 }
          />
        </div>

      </li>
    );
  }
}

IngredientCard.propTypes = {
  ing: PropTypes.objectOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default IngredientCard;
