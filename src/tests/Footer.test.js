import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import renderWithRouter from '../renderWithRouter';

const FOOTER_TESTID = 'footer';
const DRINKS_BTN_TESTID = 'drinks-bottom-btn';
const EXPLORE_BTN_TESTID = 'explore-bottom-btn';
const FOODS_BTN_TESTID = 'food-bottom-btn';

describe('Testa se o footer respeita os atributos descritos no protótipo', () => {
  it('O menu inferior possui um elemento com o test-id footer', () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByTestId(FOOTER_TESTID);
    expect(footer).toBeInTheDocument();
  });

  it('O menu inferior possui elemento com o test-id drinks-bottom-btn', () => {
    renderWithRouter(<Footer />);

    const drinksBtn = screen.getByTestId(DRINKS_BTN_TESTID);
    expect(drinksBtn).toBeInTheDocument();
  });

  it('O menu inferior possui um elemento com o test-id explore-bottom-btn', () => {
    renderWithRouter(<Footer />);

    const exploreBtn = screen.getByTestId(EXPLORE_BTN_TESTID);
    expect(exploreBtn).toBeInTheDocument();
  });

  it('O menu inferior possui um elemento com o test-id food-bottom-btn', () => {
    renderWithRouter(<Footer />);

    const foodsBtn = screen.getByTestId(FOODS_BTN_TESTID);
    expect(foodsBtn).toBeInTheDocument();
  });
});
