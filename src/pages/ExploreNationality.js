import React, { useState, useEffect } from 'react';
import { apiNationalitiesList, apiName, apiByNationality } from '../services/apiFood';
import RecipeeCard from '../components/RecipeeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ExploreNationality.css';

function ExploreNationality() {
  const [nationalities, setNationalities] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const trimArray = (array) => {
    const maxRecipes = 12;
    if (array.length > maxRecipes) {
      const slicedArray = array.slice(0, maxRecipes);
      return slicedArray;
    }
    return array;
  };

  async function fetchNationalities() {
    const natList = await apiNationalitiesList();
    setNationalities(natList);
  }

  async function defaultRecipes() {
    const recList = await apiName('');
    setRecipes(trimArray(recList));
  }

  async function select({ target }) {
    if (target.value === 'All') {
      defaultRecipes();
    } else {
      const recList = await apiByNationality(target.value);
      setRecipes(trimArray(recList));
    }
  }

  useEffect(() => {
    if (!nationalities.length) {
      fetchNationalities();
      defaultRecipes();
    }
  }, []);

  return (
    <div className="main-explore-nat">
      <Header title="Explore Nationalities" />
      {nationalities
        ? (
          <>
            {' '}
            <span>
              Nationality:
            </span>
            <select
              data-testid="explore-by-nationality-dropdown"
              onChange={ select }
            >
              <option
                value="All"
                data-testid="All-option"
              >
                All
              </option>
              {nationalities.map((nationality) => (
                <option
                  key={ nationality.strArea }
                  value={ nationality.strArea }
                  data-testid={ `${nationality.strArea}-option` }
                >
                  {nationality.strArea}

                </option>))}
            </select>
          </>
        )
        : ''}
      {recipes.length
        ? (
          <ul>
            {recipes.map((meal, index) => (
              <RecipeeCard
                key={ meal.idMeal }
                meal={ meal }
                index={ index }
              />
            ))}
          </ul>
        )
        : ''}
      <Footer />
    </div>

  );
}

export default ExploreNationality;
