import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ExploreDrinks.css';
import drink from '../images/drink.png';

function ExploreDrinks() {
  const history = useHistory();
  const fetchDrinksRecide = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return data.drinks;
  };
  const getDrinkRecipe = async () => {
    const response = await fetchDrinksRecide();
    history.push(`/drinks/${response[0].idDrink}`);
  };
  return (
    <>
      <Header title="Explore Drinks" />
      <div className="exploredrink">
        <div className="drinkbtns">
          <button
            type="button"
            className="explore-drinks-btn"
            data-testid="explore-by-ingredient"
            onClick={ () => history.push('/explore/drinks/ingredients') }
          >
            By Ingredient
          </button>
          <button
            type="button"
            className="explore-drinks-btn"
            data-testid="explore-surprise"
            onClick={ () => getDrinkRecipe() }
          >
            Surprise me!
          </button>
        </div>
        <img className="drink" src={ drink } alt="drink" />
        <Footer />
      </div>
    </>
  );
}

export default ExploreDrinks;
