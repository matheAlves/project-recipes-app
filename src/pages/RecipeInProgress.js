import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './RecipeInProgress.css';
import './RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import CheckboxIngredients from '../components/CheckboxIngredients';
import Context from '../context/Context';

function RecipeInProgress() {
  const { allChecked, favoriteOnClick, favoriteIcon,
    inPro, getRecipeDetails } = useContext(Context);
  const [disable, setDisable] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getRecipeDetails(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const copiedLink = location.pathname.replace('/in-progress', '');
  const url = 'http://mathealves.github.io'.concat(copiedLink);
  console.log(copiedLink);

  const shareRecipe = () => {
    navigator.clipboard.writeText(url);
    document.getElementById('link-copied').innerHTML = 'Link copied!';
  };

  const keysIngredients = Object.keys(inPro)
    .filter((keyObject) => keyObject.includes('strIngredient'));
  const arrayAllItems = keysIngredients
    .map((keyObject) => inPro[keyObject]);
  const arrayOfKeysIngredients = arrayAllItems
    .filter((keyFiltered) => keyFiltered !== null && keyFiltered !== '');

  const verifyAllChecked = () => {
    const recipeType = Object.keys(inPro)
      .includes('idMeal') ? 'meals' : 'cocktails';
    const recipeId = inPro.idMeal ? inPro.idMeal : inPro.idDrink;
    setDisable(!allChecked(recipeType, recipeId, arrayOfKeysIngredients));
  };

  console.log(inPro);
  const handleClickMeal = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneObject = {
      typed: 'meal',
      id: inPro.idMeal,
      type: inPro.strMeal,
      nationality: inPro.strArea,
      category: inPro.strCategory,
      name: inPro.strMeal,
      image: inPro.strMealThumb,
      doneDate: Date(),
      tags: inPro.strTags,
      link: url,
      copyLink: copiedLink,
    };
    if (doneRecipes) {
      const getObjectDone = [...doneRecipes, doneObject];
      localStorage.setItem('doneRecipes', JSON.stringify(getObjectDone));
    }
    if (!doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneObject]));
    }
  };

  const handleClickDrink = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneObject = {
      typed: 'drink',
      id: inPro.idDrink,
      type: inPro.strGlass,
      category: inPro.strCategory,
      alcoholicOrNot: inPro.strAlcoholic,
      name: inPro.strDrink,
      image: inPro.strDrinkThumb,
      doneDate: Date(),
      link: url,
      copyLink: copiedLink,
    };
    console.log(copiedLink);
    if (doneRecipes) {
      const getObjectDone = [...doneRecipes, doneObject];
      localStorage.setItem('doneRecipes', JSON.stringify(getObjectDone));
    }
    if (!doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneObject]));
    }
  };

  const renderFood = () => (
    <div className="recipe-in-progress">
      <img
        className="img-in-progress"
        src={ inPro.strMealThumb }
        alt="recipe_photo"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ inPro.strMeal }</h2>
      <p data-testid="recipe-category">{ inPro.strCategory }</p>
      <button
        type="button"
        onClick={ shareRecipe }
        data-testid="share-btn"
      >
        <img className="img-in-progress" src={ shareIcon } alt="share_icon" />
      </button>
      <p id="link-copied" />
      <input
        type="image"
        src={ favoriteIcon }
        alt="favorite_icon"
        onClick={ favoriteOnClick }
        data-testid="favorite-btn"
      />
      <div>
        <h3>Ingredients</h3>
        <div className="in-progress">
          <div className="midle">
            {
              arrayOfKeysIngredients.map((ingredient, index) => (
                <CheckboxIngredients
                  ingredient={ ingredient }
                  index={ index }
                  key={ index }
                  recipeType="meals"
                  recipeId={ inPro.idMeal }
                  verifyAllChecked={ verifyAllChecked }
                />
              ))
            }
          </div>
        </div>
      </div>
      <span data-testid="instructions">
        <h3>Instructions</h3>
        {inPro.strInstructions}
      </span>
      <Link to="/project-recipes-app/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disable }
          onClick={ handleClickMeal }
        >
          Finalizar Receita
        </button>
      </Link>

    </div>
  );

  console.log(inPro);

  const renderDrink = () => (
    <div>
      <img
        className="img-in-progress"
        src={ inPro.strDrinkThumb }
        alt="recipe_photo"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ inPro.strDrink }</h2>
      <p data-testid="recipe-category">{ inPro.strAlcoholic }</p>
      <button
        type="button"
        onClick={ shareRecipe }
        data-testid="share-btn"
      >
        <img className="img-in-progress" src={ shareIcon } alt="share_icon" />
      </button>
      <p id="link-copied" />
      <input
        type="image"
        src={ favoriteIcon }
        alt="favorite_icon"
        onClick={ favoriteOnClick }
        data-testid="favorite-btn"
      />
      <div>
        <h3>Ingredients</h3>
        <div className="in-progress">
          <div className="midle">
            {
              arrayOfKeysIngredients.map((ingredient, index) => (
                <CheckboxIngredients
                  ingredient={ ingredient }
                  index={ index }
                  key={ index }
                  recipeType="cocktails"
                  recipeId={ inPro.idDrink }
                  verifyAllChecked={ verifyAllChecked }
                />
              ))
            }
          </div>
        </div>
      </div>
      <span data-testid="instructions">
        <h3>Instructions</h3>
        {inPro.strInstructions}
      </span>
      <Link to="/project-recipes-app/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disable }
          onClick={ handleClickDrink }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
  // console.log(inPro);

  return (
    location.pathname.includes('foods') ? renderFood() : renderDrink()
  );
}

export default RecipeInProgress;
