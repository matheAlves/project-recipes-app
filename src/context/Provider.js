/* eslint-disable max-len */
/* eslint-disable sonarjs/no-duplicate-string */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Context from './Context';
import {
  apiIngredient,
  apiName,
  apiFirstLetter,
  apiMealCategories,
  apiMealsByCategory,
} from '../services/apiFood';
import {
  apiDrinkIngredient,
  apiDrinkName,
  apiDrinkFirstL,
  apiDrinkCategories,
  apiDrinksByCategory,
} from '../services/apiDrinks';

function Provider({ children }) {
  const [filterSearchInput, setFilterSearchInput] = useState('');
  const [selectedRadio, setSelected] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idType, setIdType] = useState('idMeal');
  const [categories, setCategories] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
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
    if (pathname === '/project-recipes-app/foods') {
      setIdType('idMeal');
    } else if (pathname === '/project-recipes-app/drinks') {
      setIdType('idDrink');
    }
    setLoading(false);
  }

  const fetchCategories = async () => {
    setLoading(true);
    if (location.pathname === '/project-recipes-app/foods') {
      const mealCategories = await apiMealCategories();
      setCategories(mealCategories);
    } if (location.pathname === '/project-recipes-app/drinks') {
      const drinkCategories = await apiDrinkCategories();
      setCategories(drinkCategories);
    }
  };

  const initialRender = async (foodOrDrink) => {
    if (foodOrDrink === '/project-recipes-app/foods') {
      const returnApi = await apiName('');
      if (selectedIngredient) {
        const filteredMeals = await apiIngredient(selectedIngredient);
        setData(trimArray(filteredMeals));
      } else { setData(trimArray(returnApi)); }
    } else if (foodOrDrink === '/project-recipes-app/drinks') {
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
      if (location.pathname === '/project-recipes-app/foods') {
        const meals = await apiMealsByCategory(target.innerText);
        setData(trimArray(meals));
      } else if (location.pathname === '/project-recipes-app/drinks') {
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
    if (searchType === '/project-recipes-app/foods') {
      searchFoodApi();
      setSelectedCategory('');
    }
    if (searchType === '/project-recipes-app/drinks') {
      searchDrinkApi();
      setSelectedCategory('');
    }
  };

  useEffect(() => {
    if (data) {
      if (location.pathname === '/project-recipes-app/foods' && data.length === 1 && !searchByCategory) {
        history.push(`/foods/${data[0].idMeal}`);
      } else if (
        location.pathname === '/project-recipes-app/drinks' && data.length === 1 && !searchByCategory) {
        history.push(`/drinks/${data[0].idDrink}`);
      }
    } else if (!data) {
      if (location.pathname === '/project-recipes-app/foods') {
        initialRender('/project-recipes-app/foods');
      }
      if (location.pathname === '/project-recipes-app/drinks') {
        initialRender('/project-recipes-app/drinks');
      }
    }
    setFilterSearchInput('');
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, location.pathname]);

  const contextValue = {
    handleSearchInput,
    filterSearchInput,
    handleClickSearch,
    selectedRadio,
    setSelected,
    data,
    initialRender,
    loading,
    idType,
    typeCheck,
    categories,
    handleSearchByCategory,
    setSearchByCategory,
    setSelectedCategory,
    selectedCategory,
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
