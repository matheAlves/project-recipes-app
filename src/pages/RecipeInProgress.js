import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './RecipeInProgress.css';
import './RecipeDetails.css';
import InProgress from '../components/InProgress';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';

function RecipeInProgress() {
  const [inPro, setInPro] = useState([]);
  const [disable, setDisable] = useState(true);
  const { id } = useParams();
  const location = useLocation();
  const copiedLink = location.pathname.replace('/in-progress', '');
  console.log(setDisable);

  const { stateAllChecked } = useContext(Context);

  useEffect(() => {
    async function apiRecipeByIdFood() {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      const preResult = result.meals;
      return preResult[0];
    }

    async function apiRecipeByIdDrink() {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      const preResult = result.drinks;
      return preResult[0];
    }
    // console.log(id);
    const getRecipeDetails = async () => {
      if (location.pathname.includes('food')) {
        const apiRecipeDetails = await apiRecipeByIdFood();
        setInPro(apiRecipeDetails);
      }
      if (location.pathname.includes('drink')) {
        const apiRecipeDetails = await apiRecipeByIdDrink();
        setInPro(apiRecipeDetails);
      }
    };
    getRecipeDetails();
  }, [location, id]);

  const shareRecipe = () => {
    const url = 'http://localhost:3000'.concat(copiedLink);
    navigator.clipboard.writeText(url);
    document.getElementById('link-copied').innerHTML = 'Link copied!';
  };

  const handleClick = () => {
    <Link to="/doneRecipes" />;
  };

  // const disableBtn = () => {
  //   if (CheckboxIngredients === true) {

  //   }
  // }

  const renderFood = () => (
    <div className="recipe-in-progress">
      <img
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
        <img src={ shareIcon } alt="share_icon" />
      </button>
      <p id="link-copied" />
      <button
        type="button"
        data-testid="favorite-btn"
      >
        favoritar
      </button>
      <div>
        <h3>Ingredients</h3>
        <InProgress recipeDetails={ inPro } />
      </div>
      <span data-testid="instructions">
        <h3>Instructions</h3>
        {inPro.strInstructions}
      </span>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleClick }
        disabled={ disable }
      >
        Finalizar Receita
      </button>
    </div>
  );

  const renderDrink = () => (
    <div>
      <img
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
        <img src={ shareIcon } alt="share_icon" />
      </button>
      <p id="link-copied" />
      <button type="button" data-testid="favorite-btn">favoritar</button>
      <div>
        <h3>Ingredients</h3>
        <InProgress recipeDetails={ inPro } />
      </div>
      <span data-testid="instructions">
        <h3>Instructions</h3>
        {inPro.strInstructions}
      </span>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleClick }
        disabled={ !stateAllChecked }
      >
        Finalizar Receita
      </button>
    </div>
  );
  // console.log(inPro);

  return (
    location.pathname.includes('foods') ? renderFood() : renderDrink()
  );
}

export default RecipeInProgress;
