import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import RecipeesList from './pages/RecipeesList';
import RecipeDetails from './pages/RecipeDetails';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetailsProvider from './context/RecipeDetailsProvider';
import IngredientsProvider from './context/IngredientsProvider';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreNationality from './pages/ExploreNationality';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route
          exact
          path="/project-recipes-app/"
          component={ Login }
          // render={ (props) => (<Provider><Login { ...props } /></Provider>) }
        />
        <Route
          exact
          path="/project-recipes-app/profile"
          component={ Profile }
        />
        <Route
          exact
          path="/project-recipes-app/foods"
          component={ RecipeesList }
        />
        <Route
          exact
          path="/project-recipes-app/drinks"
          component={ RecipeesList }
        />
        <Route
          exact
          path="/project-recipes-app/explore"
          component={ Explore }
        />
        <Route
          exact
          path="/project-recipes-app/explore/foods"
          component={ ExploreFoods }
        />
        <Route
          exact
          path="/project-recipes-app/explore/foods/ingredients"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/project-recipes-app/explore/foods/nationalities"
          component={ ExploreNationality }
        />
        <Route
          exact
          path="/project-recipes-app/explore/drinks"
          component={ ExploreDrinks }
        />
        <Route
          exact
          path="/project-recipes-app/foods/:id"
        >
          <RecipeDetailsProvider>
            <RecipeDetails />
          </RecipeDetailsProvider>
        </Route>
        <Route
          exact
          path="/project-recipes-app/drinks/:id"
        >
          <RecipeDetailsProvider>
            <RecipeDetails />
          </RecipeDetailsProvider>
        </Route>

        <Route
          exact
          path="/project-recipes-app/drinks/:id/in-progress"
        >
          <IngredientsProvider>
            <RecipeInProgress />
          </IngredientsProvider>
        </Route>
        <Route
          exact
          path="/project-recipes-app/foods/:id/in-progress"
        >
          <IngredientsProvider>
            <RecipeInProgress />
          </IngredientsProvider>
        </Route>
        <Route
          exact
          path="/project-recipes-app/explore/drinks/ingredients"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/project-recipes-app/done-recipes"
          component={ DoneRecipes }
        />
        <Route
          exact
          path="/project-recipes-app/favorite-recipes"
          component={ FavoriteRecipes }
        />
        <Route
          path="*"
          component={ NotFound }
        />
      </Switch>
    </Provider>
  );
}

export default App;
