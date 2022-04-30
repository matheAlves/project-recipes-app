import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import './RecipeesList.css';
import RecipeeCard from '../components/RecipeeCard';
import Footer from '../components/Footer';

function RecipeesList() {
  const { data, initialRender, idType, typeCheck, loading } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    typeCheck(location.pathname);
    initialRender(location.pathname);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="recipes">
      <Header />
      {data && !loading
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
