import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Explore from '../pages/Explore';

const SEARCH_TOP_BTN_TESTID = 'search-top-btn';
const EXPLORE_FOODS_BTN_TESTID = 'explore-foods';
const EXPLORE_DRINKS_BTN_TESTID = 'explore-drinks';

describe('Testa se os elementos respeitam os atributos descritos no protótipo', () => {
  it('Contém o data-testid: explore-foods', () => {
    renderWithRouter(<Explore />);

    const exploreFoodsBtn = screen.getByTestId(EXPLORE_FOODS_BTN_TESTID);

    expect(exploreFoodsBtn).toBeInTheDocument();
  });

  it('Contém o data-testid: explore-drinks', () => {
    renderWithRouter(<Explore />);

    const exploreDrinksBtn = screen.getByTestId(EXPLORE_DRINKS_BTN_TESTID);

    expect(exploreDrinksBtn).toBeInTheDocument();
  });
});

describe('Testa se os botões possuem os nomes "Explore Foods" e "Explore Drinks"', () => {
  it('Possui um botão chamado "Explore Foods"', () => {
    renderWithRouter(<Explore />);

    const exploreFoodsBtn = screen.getByTestId(EXPLORE_FOODS_BTN_TESTID);

    expect(exploreFoodsBtn).toHaveTextContent('Explore Foods');
  });

  it('Possui um botão chamado "Explore Drinks"', () => {
    renderWithRouter(<Explore />);

    const exploreDrinksBtn = screen.getByTestId(EXPLORE_DRINKS_BTN_TESTID);

    expect(exploreDrinksBtn).toHaveTextContent('Explore Drinks');
  });
});

describe('Testa se a pessoa usuária é redirecionada ao clicar em um dos botões', () => {
  it('O botão "Explore Foods" redireciona para a página de explorar comidas', () => {
    const { history } = renderWithRouter(<Explore />);

    const exploreFoodsBtn = screen.getByTestId(EXPLORE_FOODS_BTN_TESTID);
    userEvent.click(exploreFoodsBtn);

    expect(history.location.pathname).toBe('/explore/foods');
  });

  it('O botão "Explore Drinks" redireciona para a página de explorar bebidas', () => {
    const { history } = renderWithRouter(<Explore />);

    const exploreDrinksBtn = screen.getByTestId(EXPLORE_DRINKS_BTN_TESTID);
    userEvent.click(exploreDrinksBtn);

    expect(history.location.pathname).toBe('/explore/drinks');
  });
});

describe('Testa o header da a rota /explore', () => {
  it('O header contém um título com o texto Recipes App', () => {
    renderWithRouter(<Explore />);

    const profileTopBtn = screen.getByTestId('profile-top-btn');

    expect(profileTopBtn).toBeInTheDocument();

    const title = screen.getByTestId('page-title');

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Explore');
  });

  it('O botão search não deve estar renderizado na tela', () => {
    renderWithRouter(<Explore />);

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN_TESTID);
    expect(searchTopBtn).not.toBeInTheDocument();
  });
});
