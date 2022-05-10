import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Context from './Context';
import {
  apiName,
  apiRecipeById,
} from '../services/apiFood';
import {
  apiDrinkName,
  apiDrinkRecipeById,
} from '../services/apiDrinks';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetailsProvider({ children }) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [startRecipe, setStartRecipe] = useState(true);
  const [buttonName, setButtonName] = useState('Start Recipe');
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);

  const location = useLocation();

  // função que cria objeto de comida favorita
  const foodFavoriteRecipe = (type) => ({
    id: recipeDetails.idMeal,
    type,
    nationality: recipeDetails.strArea,
    category: recipeDetails.strCategory,
    alcoholicOrNot: '',
    name: recipeDetails.strMeal,
    image: recipeDetails.strMealThumb,
  });

  // função que cria objeto de drink favorito

  const drinkFavoriteRecipe = (type) => ({
    id: recipeDetails.idDrink,
    type,
    nationality: '',
    category: recipeDetails.strCategory,
    alcoholicOrNot: recipeDetails.strAlcoholic,
    name: recipeDetails.strDrink,
    image: recipeDetails.strDrinkThumb,
  });

  // função chamada no botão de favoritar
  const favoriteOnClick = () => {
    const icon = favoriteIcon === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon;
    setFavoriteIcon(icon);
    const type = location.pathname.includes('food') ? 'food' : 'drink';
    const favoriteRecipe = (type === 'food')
      ? foodFavoriteRecipe(type) : drinkFavoriteRecipe(type);
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
  };

  // função que checa se a receita ja é favoritada e altera a cor do ícone
  const favoriteRecipeState = (recipeDetail) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const foundFavoriteRecipe = favoriteRecipes.find((favRecipe) => (
        favRecipe.id === recipeDetail.idMeal || favRecipe.id === recipeDetail.idDrink
      ));
      if (foundFavoriteRecipe) {
        setFavoriteIcon(blackHeartIcon);
      } if (!foundFavoriteRecipe) {
        setFavoriteIcon(whiteHeartIcon);
      }
    }
  };

  const startRecipeState = (recipeDetail) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const foundDoneRecipe = doneRecipes.find((doneRecipe) => (
        doneRecipe.name === recipeDetail.strMeal
        || doneRecipe.name === recipeDetail.strDrink
      ));
      if (foundDoneRecipe) {
        setStartRecipe(false);
      } if (!foundDoneRecipe) {
        setStartRecipe(true);
      }
    }
  };

  const continueRecipeState = (recipeDetail, path) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      let foundInProgressRecipe;
      if (path.includes('foods')) {
        foundInProgressRecipe = inProgressRecipes.meals[recipeDetail.idMeal];
      } if (path.includes('drinks')) {
        foundInProgressRecipe = inProgressRecipes.cocktails[recipeDetail.idDrink];
      }
      if (foundInProgressRecipe) {
        setButtonName('Continue Recipe');
      } if (!foundInProgressRecipe) {
        setButtonName('Start Recipe');
      }
    }
  };

  const getRecipeDetails = async (path) => {
    const pathArray = path.split('/');
    const id = pathArray[pathArray.length - 1];
    if (path.includes('foods')) {
      const apiRecipeDetails = await apiRecipeById(id);
      setRecipeDetails(apiRecipeDetails.meals[0]);
      startRecipeState(apiRecipeDetails.meals[0]);
      continueRecipeState(apiRecipeDetails.meals[0], path);
      favoriteRecipeState(apiRecipeDetails.meals[0]);
    }
    if (path.includes('drinks')) {
      const apiDrinkDetails = await apiDrinkRecipeById(id);
      setRecipeDetails(apiDrinkDetails.drinks[0]);
      startRecipeState(apiDrinkDetails.drinks[0]);
      continueRecipeState(apiDrinkDetails.drinks[0], path);
      favoriteRecipeState(apiDrinkDetails.drinks[0]);
    }
  };

  const getRecommendations = async (path) => {
    const numberOfRecommendation = 6;
    if (path.includes('foods')) {
      const apiDrinks = await apiDrinkName('');
      const slicedDrinks = apiDrinks.slice(0, numberOfRecommendation);
      setRecommendations(slicedDrinks);
    }
    if (path.includes('drinks')) {
      const apiFoods = await apiName('');
      const slicedFoods = apiFoods.slice(0, numberOfRecommendation);
      setRecommendations(slicedFoods);
    }
  };

  const contextValue = {
    getRecipeDetails,
    recipeDetails,
    getRecommendations,
    recommendations,
    startRecipe,
    buttonName,
    favoriteIcon,
    favoriteOnClick,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

RecipeDetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RecipeDetailsProvider;
