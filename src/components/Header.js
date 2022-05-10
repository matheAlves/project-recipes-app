import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import './Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [showSearch, setshowSearch] = useState(false);
  const history = useHistory();
  return (
    <header>
      <nav className="nav">
        <Link to="/profile">
          <img
            className="profile"
            src={ profileIcon }
            alt="drink-icon"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        {/* <button
          type="button"
          className="profilebtn"
          onClick={ () => history.push('/profile') }
        >
          <img
            className="profile"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"
          />
        </button> */}
        <h1 data-testid="page-title">{title}</h1>
        {title === 'Foods' || title === 'Drinks' || title === 'Explore Nationalities' ? (
          <img
            className="search"
            onClick={ () => setshowSearch(!showSearch) }
            src={ searchIcon }
            alt="drink-icon"
            data-testid="search-top-btn"
          />
          // <button
          //   className="searchbtn"
          //   type="button"
          //   onClick={ () => setshowSearch(!showSearch) }
          // >
          //   <img
          //     className="search"
          //     data-testid="search-top-btn"
          //     src={ searchIcon }
          //     alt="search icon"
          //   />
          // </button>
        )
          : (
            <button
              aria-label="btn"
              type="button"
              className="invisiblebtn"
            />)}
        { showSearch ? <SearchBar /> : ''}
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
