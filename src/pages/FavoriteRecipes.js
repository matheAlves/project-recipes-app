import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import '../components/DoneRecipeCard.css';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState();
  const { favoriteIcon, favoriteOnClick } = useContext(Context);

  useEffect(() => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favoritesRecipes);
  }, []);

  const shareRecipe = (id) => {
    const link = `http://localhost:3000/foods/${id}`;
    // document.getElementById('link-copied').innerHTML = 'Link copied!';
    return (navigator.clipboard.writeText(link));
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
      </Link>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drink
      </button>
      <div>
        {!favorites
          ? <h1>No favorite recipes saved</h1>
          : (
            <>
              {favorites.map(
                (recipe, index) => (
                  <div key={ index } className="recipe-card">
                    <img
                      src={ recipe.image }
                      alt="recipe"
                      data-testid={ `${index}-horizontal-image` }
                    />
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {recipe.nationality}
                      {' '}
                      -
                      {' '}
                      {recipe.category}
                    </p>
                    <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
                    <button
                      type="button"
                      onClick={ shareRecipe(recipe.id) }
                    >
                      <img
                        className="img-share"
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="share_icon"
                      />
                    </button>
                    <p id="link-copied" />
                    <input
                      type="image"
                      src={ favoriteIcon }
                      alt="favorite_icon"
                      onClick={ favoriteOnClick }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </div>
                ),
              )}
            </>
          )}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
