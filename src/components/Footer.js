import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footerIcons">
      <Link to="/project-recipes-app/drinks">
        <img
          src={ drinkIcon }
          alt="drink-icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link to="/project-recipes-app/explore">
        <img
          src={ exploreIcon }
          alt="explore-icon"
          data-testid="explore-bottom-btn"
        />
      </Link>

      <Link to="/project-recipes-app/foods">
        <img
          src={ mealIcon }
          alt="meal-icon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
