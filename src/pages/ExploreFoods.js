import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ExploreFoods.css';
import food from '../images/food.png';

function ExploreFoods() {
  const history = useHistory();
  const fetchFoodRecide = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return data.meals;
  };
  const getFoodRecipe = async () => {
    const foodRecipe = await fetchFoodRecide();
    const idFood = foodRecipe[0].idMeal;
    history.push(`/foods/${idFood}`);
  };
  return (
    <>
      <Header title="Explore Foods" />
      <div className="explorefood">
        <div className="foodbtns">
          <button
            type="button"
            className="explore-food-button"
            data-testid="explore-by-ingredient"
            onClick={ () => history.push('/explore/foods/ingredients') }
          >
            By Ingredient
          </button>
          <button
            type="button"
            className="explore-food-button"
            data-testid="explore-by-nationality"
            onClick={ () => history.push('/explore/foods/nationalities') }
          >
            By Nationality
          </button>
          <button
            type="button"
            className="explore-food-button"
            data-testid="explore-surprise"
            onClick={ () => getFoodRecipe() }
          >
            Surprise me!
          </button>
        </div>
        <img className="food" src={ food } alt="food" />
        <Footer />
      </div>
    </>
  );
}

export default ExploreFoods;
