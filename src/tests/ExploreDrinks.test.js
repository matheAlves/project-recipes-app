import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ExploreDrinks from '../pages/ExploreDrinks';
import App from '../App';
import { randomDrinks } from './mocks/mocks';

const BY_INGREDIENTS_BTN_TESTID = 'explore-by-ingredient';
const SURPRISE_ME_BTN_TESTID = 'explore-surprise';
const BY_NATIONALITY_BTN_TESTID = 'explore-by-nationality';
const EXPLORE_FOODS_BTN_TESTID = 'explore-foods';
const EXPLORE_DRINKS_BTN_TESTID = 'explore-drinks';
const EXPLORE_BOTTOM_BTN_TESTID = 'explore-bottom-btn';
const EMAIL_INPUT_TESTID = 'email-input';
const PASSWORD_INPUT_TESTID = 'password-input';
const EMAIL = 'email@mail.com';
const PASSWORD = '0123456789';
const ENTER_BTN_TESTID = 'login-submit-btn';

describe('Testa se os elementos da tela respeitam os atributos do protótipo.', () => {
  it('Possui o botão com data-testid "explore-by-ingredient".', () => {
    renderWithRouter(<ExploreDrinks />);

    const byIngredientsBtn = screen.getByTestId(BY_INGREDIENTS_BTN_TESTID);

    expect(byIngredientsBtn).toBeInTheDocument();
  });

  it('Possui o botão com data-testid "explore-surprise".', () => {
    renderWithRouter(<ExploreDrinks />);

    const surpriseMeBtn = screen.getByTestId(SURPRISE_ME_BTN_TESTID);

    expect(surpriseMeBtn).toBeInTheDocument();
  });

  it('Não possui o botão com o data-testid "explore-by-nationality".', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const enterButton = screen.getByTestId(ENTER_BTN_TESTID);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    userEvent.click(enterButton);

    expect(history.location.pathname).toBe('/foods');

    const exploreBottonBtn = screen.getByTestId(EXPLORE_BOTTOM_BTN_TESTID);

    userEvent.click(exploreBottonBtn);

    expect(history.location.pathname).toBe('/explore');

    const exploreFoodsBtn = screen.getByTestId(EXPLORE_FOODS_BTN_TESTID);
    const exploreDrinksBtn = screen.getByTestId(EXPLORE_DRINKS_BTN_TESTID);

    userEvent.click(exploreFoodsBtn);

    expect(history.location.pathname).toBe('/explore/foods');
    const byNationalityBtn = screen.getByTestId(BY_NATIONALITY_BTN_TESTID);
    history.push('/explore');
    userEvent.click(exploreDrinksBtn);

    expect(byNationalityBtn).not.toBeInTheDocument();
  });
});

describe('Testa se a tela possui três botões para explorar as bebidas', () => {
  it('Os botões "By Ingredients" e "Surprise me!" estão renderizados na tela.', () => {
    renderWithRouter(<ExploreDrinks />);

    const byIngredientsBtn = screen.getByTestId(BY_INGREDIENTS_BTN_TESTID);
    const surpriseMeBtn = screen.getByTestId(SURPRISE_ME_BTN_TESTID);

    expect(byIngredientsBtn && surpriseMeBtn).toBeInTheDocument();
  });
});

describe('Testa se ao clicar nos botões a rota é modificada', () => {
  it('Ao clicar no botão "By Ingredients" a rota muda para a página '
   + 'de explorar por ingredientes.', () => {
    const { history } = renderWithRouter(<ExploreDrinks />);

    const byIngredientsBtn = screen.getByTestId(BY_INGREDIENTS_BTN_TESTID);

    userEvent.click(byIngredientsBtn);

    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });

  it('Ao clicar no botão "Surprise me!" a rota muda para a página '
    + 'de detalhes de uma bebida aleatória.', () => {
    const { history } = renderWithRouter(<ExploreDrinks />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(randomDrinks),
    });

    const surpriseMeBtn = screen.getByTestId(SURPRISE_ME_BTN_TESTID);

    userEvent.click(surpriseMeBtn);

    expect(history.location.pathname).toBe('/drinks/15691');
  });
});
