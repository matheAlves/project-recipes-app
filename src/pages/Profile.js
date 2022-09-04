/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Profile.css';

function Profile() {
  const history = useHistory();
  const [user, setUser] = useState('emaildefault@email.com');
  const emailUser = localStorage.getItem('user'); // o emailUser vai pegar a chave user com a info: email:... . Em seguida é feita a desestruturação dessa chave e o JSON.parse pega a string e transforma em um objeto JS para que a chave email seja acessada e retorne apenas o seu valor.

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    if (emailUser) {
      const { email } = JSON.parse(emailUser); // estrutura retornada sem o JSON.parse: {"email":"alline_franciely@hotmail.com"}
      setUser(email);
    }
  }, []);

  return (
    <div className="profilepage">
      <Header title="Profile" />
      <p data-testid="profile-email" className="email">{ user }</p>
      <div className="profilebtns">
        <button
          type="button"
          className="profile-btn"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          className="profile-btn"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          className="profile-btn"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
