import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';
import { apiRecipeById } from '../services/apiFood';
import { apiDrinkRecipeById } from '../services/apiDrinks';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function IngredientsProvider({ children }) {
  const [inPro, setInPro] = useState([]);
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);
  const location = useLocation();

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

  const getRecipeDetails = async (path) => {
    const pathArray = path.split('/');
    const id = pathArray[pathArray.length - 2];
    if (path.includes('foods')) {
      const apiRecipeDetails = await apiRecipeById(id);
      setInPro(apiRecipeDetails.meals[0]);
      favoriteRecipeState(apiRecipeDetails.meals[0]);
    }
    if (path.includes('drinks')) {
      const apiDrinkDetails = await apiDrinkRecipeById(id);
      setInPro(apiDrinkDetails.drinks[0]);
      favoriteRecipeState(apiDrinkDetails.drinks[0]);
    }
  };

  const removeFromArray = (array, item) => {
    if (array.includes(item)) {
      return array.filter((x) => x !== item);
    }
    return array;
  };

  const addToArray = (array, item) => {
    if (!array.includes(item)) {
      array.push(item);
    }
    return array;
  };

  const modifyItem = (recipeType, recipeId, recipeItem, operation) => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({}));
    }
    const oldObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const recipeObjOtherTypes = { ...oldObj };
    if (Object.keys(recipeObjOtherTypes).includes(recipeType)) {
      delete recipeObjOtherTypes[recipeType];
    }
    let objRecipeId = [];
    const objOtherRecipeIds = { ...oldObj[recipeType] };
    if (Object.keys(oldObj).includes(recipeType)
      && Object.keys(oldObj[recipeType]).includes(recipeId)) {
      objRecipeId = Object.values(oldObj[recipeType][recipeId]);
      delete objOtherRecipeIds[recipeId];
    }
    if (operation === 'add') {
      objRecipeId = addToArray(objRecipeId, recipeItem);
    }
    if (operation === 'remove') {
      objRecipeId = removeFromArray(objRecipeId, recipeItem);
    }
    const newObj = {
      ...recipeObjOtherTypes,
      [recipeType]: {
        ...objOtherRecipeIds,
        [recipeId]: objRecipeId,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
  };

  const checkValue = (recipeType, recipeId, recipeItem) => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({}));
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Object.keys(inProgressRecipes).includes(recipeType)
    && Object.keys(inProgressRecipes[recipeType]).includes(recipeId)) {
      const objRecipeId = Object.values(inProgressRecipes[recipeType][recipeId]);
      return objRecipeId.includes(recipeItem);
    }
    return false;
  };

  const allChecked = (recipeType, recipeId, Ingredients) => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({}));
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Object.keys(inProgressRecipes).includes(recipeType)) {
      const arrayIngredients = Object.values(inProgressRecipes[recipeType][recipeId]);
      return Ingredients.every((x) => arrayIngredients.includes(x));
    }
    return false;
  };

  const foodFavoriteRecipe = (type) => ({
    id: inPro.idMeal,
    type,
    nationality: inPro.strArea,
    category: inPro.strCategory,
    alcoholicOrNot: '',
    name: inPro.strMeal,
    image: inPro.strMealThumb,
  });

  const drinkFavoriteRecipe = (type) => ({
    id: inPro.idDrink,
    type,
    nationality: '',
    category: inPro.strCategory,
    alcoholicOrNot: inPro.strAlcoholic,
    name: inPro.strDrink,
    image: inPro.strDrinkThumb,
  });

  const favoriteOnClick = () => {
    const icon = favoriteIcon === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon;
    setFavoriteIcon(icon);
    const type = location.pathname.includes('food') ? 'food' : 'drink';
    const favoriteRecipe = (type === 'food')
      ? foodFavoriteRecipe(type) : drinkFavoriteRecipe(type);
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
    }
    // if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    //   console.log('remover');
    // }
  };

  const contextValue = {
    checkValue,
    modifyItem,
    allChecked,
    favoriteOnClick,
    favoriteIcon,
    favoriteRecipeState,
    getRecipeDetails,
    inPro,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

IngredientsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IngredientsProvider;
