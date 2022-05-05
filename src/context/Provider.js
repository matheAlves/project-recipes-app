/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Context from './Context';
import {
  apiIngredient,
  apiName,
  apiFirstLetter,
  apiRecipeById,
  apiMealCategories,
  apiMealsByCategory,
} from '../services/apiFood';
import {
  apiDrinkIngredient,
  apiDrinkName,
  apiDrinkFirstL,
  apiDrinkRecipeById,
  apiDrinkCategories,
  apiDrinksByCategory,
} from '../services/apiDrinks';

function Provider({ children }) {
  const [filterSearchInput, setFilterSearchInput] = useState('');
  const [selectedRadio, setSelected] = useState();
  const [data, setData] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idType, setIdType] = useState('idMeal');
  const [categories, setCategories] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [startRecipe, setStartRecipe] = useState(true);
  const [buttonName, setButtonName] = useState('Start Recipe');
  const [selectedIngredient, setSelectedIngredient] = useState('');

  const history = useHistory();
  const location = useLocation();
  const alert = 'Sorry, we haven\'t found any recipes for these filters.';

  const handleSearchInput = ({ target }) => {
    setFilterSearchInput(target.value);
  };

  const trimArray = (array) => {
    const maxRecipes = 12;
    if (array.length > maxRecipes) {
      const slicedArray = array.slice(0, maxRecipes);
      return slicedArray;
    }
    return array;
  };

  const selectIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  function typeCheck(pathname) {
    setLoading(true);
    if (pathname === '/foods') {
      setIdType('idMeal');
    } else if (pathname === '/drinks') {
      setIdType('idDrink');
    }
    setLoading(false);
  }

  const fetchCategories = async () => {
    setLoading(true);
    if (location.pathname === '/foods') {
      const mealCategories = await apiMealCategories();
      setCategories(mealCategories);
    } if (location.pathname === '/drinks') {
      const drinkCategories = await apiDrinkCategories();
      setCategories(drinkCategories);
    }
  };

  const initialRender = async (foodOrDrink) => {
    if (foodOrDrink === '/foods') {
      const returnApi = await apiName('');
      if (selectedIngredient) {
        const filteredMeals = await apiIngredient(selectedIngredient);
        setData(trimArray(filteredMeals));
      } else { setData(trimArray(returnApi)); }
    } else if (foodOrDrink === '/drinks') {
      const returnApi = await apiDrinkName('');
      if (selectedIngredient) {
        const filteredDrinks = await apiDrinkIngredient(selectedIngredient);
        setData(trimArray(filteredDrinks));
      } else {
        setData(trimArray(returnApi));
      }
    }
    setSelectedIngredient('');
    setSelectedCategory('ALL');
    setSearchByCategory(false);
    typeCheck(location.pathname);
  };

  const handleSearchByCategory = async ({ target }) => {
    if (target.innerText !== selectedCategory) {
      setSelectedCategory(target.innerText);
      setSearchByCategory(true);
      if (location.pathname === '/foods') {
        const meals = await apiMealsByCategory(target.innerText);
        setData(trimArray(meals));
      } else if (location.pathname === '/drinks') {
        const drinks = await apiDrinksByCategory(target.innerText);
        setData(trimArray(drinks));
      }
    } if (target.innerText === selectedCategory) {
      initialRender(location.pathname);
    }
    setSelectedCategory(target.innerText);
    setSearchByCategory(true);
    typeCheck(location.pathname);
  };

  async function searchHelper(input, api) {
    setLoading(true);
    const returnApi = await api(input);
    const returnArray = await returnApi;
    if (!returnArray) {
      return global.alert(alert);
    }
    setData(trimArray(returnArray));
    typeCheck(location.pathname);
  }

  const searchFoodApi = async () => {
    if (selectedRadio === 'ingredient-search-radio' && filterSearchInput) {
      const returnApi = await apiIngredient(filterSearchInput);
      if (!returnApi) {
        return global.alert(alert);
      }
      setData(trimArray(returnApi));
    }

    if (selectedRadio === 'name-search-radio' && filterSearchInput) {
      const returnApi = await apiName(filterSearchInput);
      if (!returnApi) {
        return global.alert(alert);
      }
      setData(trimArray(returnApi));
    }

    if (selectedRadio === 'first-letter-search-radio' && filterSearchInput) {
      if (filterSearchInput.length === 1) {
        searchHelper(filterSearchInput, apiFirstLetter);
      } else {
        return global.alert('Your search must have only 1 (one) character');
      }
    }

    if (!selectedRadio || !filterSearchInput) {
      return global.alert('Preencha corretamente os critérios da busca');
    }
    typeCheck(location.pathname);
  };

  const searchDrinkApi = async () => {
    if (selectedRadio === 'ingredient-search-radio' && filterSearchInput) {
      const returnApi = await apiDrinkIngredient(filterSearchInput);
      if (!returnApi) {
        return global.alert(alert);
      }
      setData(trimArray(returnApi));
    }
    if (selectedRadio === 'name-search-radio' && filterSearchInput) {
      const returnApi = await apiDrinkName(filterSearchInput);
      if (!returnApi) {
        return global.alert(alert);
      }
      setData(trimArray(returnApi));
    }
    if (selectedRadio === 'first-letter-search-radio' && filterSearchInput) {
      if (filterSearchInput.length === 1) {
        searchHelper(filterSearchInput, apiDrinkFirstL);
      } else {
        return global.alert('Your search must have only 1 (one) character');
      }
    }
    if (!selectedRadio || !filterSearchInput) {
      return global.alert('Preencha corretamente os critérios da busca');
    }
    typeCheck(location.pathname);
  };

  const handleClickSearch = (searchType) => {
    setSearchByCategory(false);
    if (searchType === '/foods') {
      searchFoodApi();
      setSelectedCategory('');
    }
    if (searchType === '/drinks') {
      searchDrinkApi();
      setSelectedCategory('');
    }
  };

  useEffect(() => {
    if (data) {
      if (location.pathname === '/foods' && data.length === 1 && !searchByCategory) {
        history.push(`/foods/${data[0].idMeal}`);
      } else if (
        location.pathname === '/drinks' && data.length === 1 && !searchByCategory) {
        history.push(`/drinks/${data[0].idDrink}`);
      }
    } else if (!data) {
      if (location.pathname === '/foods') {
        initialRender('/foods');
      }
      if (location.pathname === '/drinks') {
        initialRender('/drinks');
      }
    }
    setFilterSearchInput('');
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, location.pathname]);

  const startRecipeState = (recipeDetail) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const foundDoneRecipe = doneRecipes.find((doneRecipe) => (
        doneRecipe.id === recipeDetail.idMeal || doneRecipe.id === recipeDetail.idDrink
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
    }
    if (path.includes('drinks')) {
      const apiDrinkDetails = await apiDrinkRecipeById(id);
      setRecipeDetails(apiDrinkDetails.drinks[0]);
      startRecipeState(apiDrinkDetails.drinks[0]);
      continueRecipeState(apiDrinkDetails.drinks[0], path);
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
    handleSearchInput,
    filterSearchInput,
    handleClickSearch,
    selectedRadio,
    setSelected,
    data,
    initialRender,
    getRecipeDetails,
    recipeDetails,
    getRecommendations,
    recommendations,
    loading,
    idType,
    typeCheck,
    categories,
    handleSearchByCategory,
    setSearchByCategory,
    setSelectedCategory,
    selectedCategory,
    startRecipe,
    buttonName,
    selectIngredient,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
