import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';

function RecomendationCard() {
  const {
    recommendations, getRecommendations,
  } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    getRecommendations(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const recommendationFoodCard = () => recommendations
    .map((recomendation, index) => (
      <div key={ index } data-testid={ `${index}-recomendation-card` }>
        <img
          src={ recomendation.strMealThumb }
          alt="recipe_photo"
          data-testid={ `${index}-recomendation-photo` }
        />
        <title
          data-testid={ `${index}-recomendation-title` }
        >
          { recomendation.strMeal }
        </title>
        <span
          data-testid={ `${index}-recomendation-category` }
        >
          {recomendation.strCategory}
        </span>
      </div>
    ));

  const recommendationDrinkCard = () => recommendations
    .map((recomendation, index) => (
      <div key={ index } data-testid={ `${index}-recomendation-card` }>
        <img
          src={ recomendation.strDrinkThumb }
          alt="recipe_photo"
          data-testid={ `${index}-recomendation-photo` }
        />
        <title
          data-testid={ `${index}-recomendation-title` }
        >
          { recomendation.strDrink }
        </title>
        <span
          data-testid={ `${index}-recomendation-category` }
        >
          {recomendation.strCategory}
        </span>
      </div>
    ));

  return (
    location.pathname
      .includes('foods') ? recommendationDrinkCard() : recommendationFoodCard()
  );
}

export default RecomendationCard;
