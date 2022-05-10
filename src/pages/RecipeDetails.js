import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Context from '../context/Context';
import RecomendationCard from '../components/RecommendationCard';
import './RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails() {
  const {
    getRecipeDetails,
    recipeDetails,
    startRecipe,
    buttonName,
    favoriteIcon,
    favoriteOnClick,
  } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    getRecipeDetails(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const recipeVideo = () => {
    // https://stackoverflow.com/questions/25661182/embed-youtube-video-refused-to-display-in-a-frame-because-it-set-x-frame-opti
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/replace#exemplos
    if (recipeDetails.strYoutube) {
      const url = recipeDetails.strYoutube;
      return url.replace('watch?v=', 'embed/');
    }
  };

  const filterIngredients = () => {
    // https://masteringjs.io/tutorials/fundamentals/filter-key#:~:text=JavaScript%20objects%20don't%20have,()%20function%20as%20shown%20below.
    const ingredients = Object.entries(recipeDetails)
      .filter(([key, value]) => key.includes('Ingredient') && value);
    return ingredients.map(([, value], index) => (
      <span
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { value }
        { recipeDetails['strMeasure'.concat(index + 1)] }
      </span>
    ));
  };

  const shareRecipe = () => {
    const url = 'http://localhost:3000'.concat(location.pathname);
    navigator.clipboard.writeText(url);
    document.getElementById('link-copied').innerHTML = 'Link copied!';
  };

  const renderFood = () => (
    <div className="recipeDetails">
      <img
        src={ recipeDetails.strMealThumb }
        alt="recipe_photo"
        data-testid="recipe-photo"
      />
      <div className="recipeTitleAndIcons">
        <h2 data-testid="recipe-title">{ recipeDetails.strMeal }</h2>
        <div className="recipeIcons">
          <input
            src={ shareIcon }
            alt="share_icon"
            type="image"
            data-testid="share-btn"
            onClick={ shareRecipe }
          />
          <p id="link-copied" />
          <input
            type="image"
            src={ favoriteIcon }
            alt="favorite_icon"
            onClick={ favoriteOnClick }
            data-testid="favorite-btn"
          />
        </div>
      </div>
      <p className="recipeCategory" data-testid="recipe-category">
        {recipeDetails.strCategory}
      </p>
      <div>
        <h3>Ingredients</h3>
        <div className="recipeIngredients">
          { filterIngredients() }
        </div>
      </div>
      <h3>Instructions</h3>
      <span className="recipeInstructions" data-testid="instructions">
        {recipeDetails.strInstructions}
      </span>
      <h3>Video</h3>
      <iframe
        width="560"
        height="315"
        src={ recipeVideo() }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
        + picture-in-picture"
        allowFullScreen
        data-testid="video"
      >
        { recipeDetails.strYoutube }
      </iframe>
      <div className="horizontalScroll">
        <h3>Recommended</h3>
        <RecomendationCard />
      </div>
      { startRecipe
        && (
          <div>
            <Link to={ `/foods/${recipeDetails.idMeal}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btnStartRecipe"
              >
                { buttonName }
              </button>
            </Link>
          </div>)}
    </div>
  );

  const renderDrink = () => (
    <div className="recipeDetails">
      <img
        src={ recipeDetails.strDrinkThumb }
        alt="recipe_photo"
        data-testid="recipe-photo"
      />
      <div className="recipeTitleAndIcons">
        <h2 data-testid="recipe-title">{ recipeDetails.strDrink }</h2>
        <div className="recipeIcons">
          <input
            src={ shareIcon }
            alt="share_icon"
            type="image"
            data-testid="share-btn"
            onClick={ shareRecipe }
          />
          <p id="link-copied" />
          <input
            type="image"
            src={ favoriteIcon }
            alt="favorite_icon"
            onClick={ favoriteOnClick }
            data-testid="favorite-btn"
          />
        </div>
      </div>
      <p className="recipeCategory" data-testid="recipe-category">
        {recipeDetails.strAlcoholic}
      </p>
      <div>
        <h3>Ingredients</h3>
        <div className="recipeIngredients">
          { filterIngredients() }
        </div>
      </div>
      <h3>Instructions</h3>
      <span className="recipeInstructions" data-testid="instructions">
        {recipeDetails.strInstructions}
      </span>
      <div className="horizontalScroll">
        <h3>Recommended</h3>
        <RecomendationCard />
      </div>
      { startRecipe
        && (
          <div>
            <Link to={ `/drinks/${recipeDetails.idDrink}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btnStartRecipe"
              >
                { buttonName }
              </button>
            </Link>
          </div>)}
    </div>
  );

  return (
    location.pathname.includes('foods') ? renderFood() : renderDrink()
  );
}

export default RecipeDetails;
