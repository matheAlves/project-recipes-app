import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState({
    email: '',
  });
  const [password, setPassword] = useState('');
  const history = useHistory();

  function handleOnChange({ target }) {
    const { type, value } = target;
    if (type === 'email') {
      setUser(({
        email: value,
      }));
    } else {
      setPassword(value);
    }
  }

  function handleSubmit() {
    setUser({
      email: '',
    });
    setPassword('');
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/project-recipes-app/foods');
  }

  useEffect(() => {
    const validateButton = () => {
      const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i;
      const minCharacters = 7;

      if (user.email.match(emailRegex) && password.length >= minCharacters) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };

    validateButton();
  }, [user, password]);
  return (

    <div className="login-screen">
      <h1>Recipes App</h1>

      <form>
        <h2>Login</h2>
        <input
          data-testid="email-input"
          placeholder="Email"
          id="email-name-input"
          type="email"
          value={ user.email }
          onChange={ handleOnChange }
        />
        <input
          data-testid="password-input"
          placeholder="Password"
          id="password-login-input"
          type="password"
          value={ password }
          onChange={ handleOnChange }
        />
      </form>
      <button
        onClick={ handleSubmit }
        data-testid="login-submit-btn"
        type="submit"
        disabled={ disabled }
      >
        Enter
      </button>

    </div>

  );
}

export default Login;
