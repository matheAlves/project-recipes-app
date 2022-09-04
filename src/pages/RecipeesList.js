import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import './RecipeesList.css';
import RecipeeCard from '../components/RecipeeCard';
import Footer from '../components/Footer';
import CategoriesFilter from '../components/CategoriesFilter';

function RecipeesList() {
  const [title, setTitle] = useState();
  const { data, initialRender, idType, loading } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    initialRender(location.pathname);
    if (location.pathname.includes('foods')) {
      setTitle('Foods');
    } if (location.pathname.includes('drinks')) {
      setTitle('Drinks');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="recipes">
      {title
        ? <Header title={ title } />
        : ''}

      <CategoriesFilter />
      {!loading
        ? (
          <ul className="recipeesList">
            {data.map(
              (meal, index) => (<RecipeeCard
                key={ meal[idType] }
                meal={ meal }
                index={ index }
              />),
            )}
          </ul>
        )
        : <h1>Loading...</h1>}
      <Footer />
    </div>
  );
}

export default RecipeesList;
