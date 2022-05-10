import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ExploreFoods from '../pages/ExploreFoods';
import { randomMeals } from './mocks/mocks';

const BY_INGREDIENTS_BTN_TESTID = 'explore-by-ingredient';
const SURPRISE_ME_BTN_TESTID = 'explore-surprise';
const BY_NATIONALITY_BTN_TESTID = 'explore-by-nationality';

describe('Testa se os elementos da tela respeitam os atributos do protótipo.', () => {
  it('Possui o data-testid "explore-by-ingredient".', () => {
    renderWithRouter(<ExploreFoods />);

    const byIngredientsBtn = screen.getByTestId(BY_INGREDIENTS_BTN_TESTID);

    expect(byIngredientsBtn).toBeInTheDocument();
  });

  it('Possui o data-testid "explore-surprise".', () => {
    renderWithRouter(<ExploreFoods />);

    const surpriseMeBtn = screen.getByTestId(SURPRISE_ME_BTN_TESTID);

    expect(surpriseMeBtn).toBeInTheDocument();
  });

  it('Possui o data-testid "explore-by-nationality".', () => {
    renderWithRouter(<ExploreFoods />);

    const byNationalityBtn = screen.getByTestId(BY_NATIONALITY_BTN_TESTID);

    expect(byNationalityBtn).toBeInTheDocument();
  });
});

describe('Testa se a tela possui três botões para explorar as comidas', () => {
  it('Os botões "By Ingredients", "By Nationality" e "Surprise me!"'
  + 'estão renderizados na tela.', () => {
    renderWithRouter(<ExploreFoods />);

    const byIngredientsBtn = screen.getByTestId(BY_INGREDIENTS_BTN_TESTID);
    const byNationalityBtn = screen.getByTestId(BY_NATIONALITY_BTN_TESTID);
    const surpriseMeBtn = screen.getByTestId(SURPRISE_ME_BTN_TESTID);

    expect(byIngredientsBtn && byNationalityBtn && surpriseMeBtn).toBeInTheDocument();
  });
});

describe('Testa se ao clicar nos botões a rota é modificada', () => {
  it('Ao clicar no botão "By Ingredients" a rota muda para a página '
   + 'de explorar por ingredientes.', () => {
    const { history } = renderWithRouter(<ExploreFoods />);

    const byIngredientsBtn = screen.getByTestId(BY_INGREDIENTS_BTN_TESTID);

    userEvent.click(byIngredientsBtn);

    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });

  it('Ao clicar no botão "By Nationality" a rota muda para a página '
  + 'de explorar por nacionalidade', () => {
    const { history } = renderWithRouter(<ExploreFoods />);

    const byNationalityBtn = screen.getByTestId(BY_NATIONALITY_BTN_TESTID);

    userEvent.click(byNationalityBtn);

    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });

  it('Ao clicar no botão "Surprise me!" a rota muda para a página '
    + 'de detalhes de uma bebida aleatória.', () => {
    const { history } = renderWithRouter(<ExploreFoods />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(randomMeals),
    });

    const surpriseMeBtn = screen.getByTestId(SURPRISE_ME_BTN_TESTID);

    userEvent.click(surpriseMeBtn);

    expect(history.location.pathname).toBe('/foods/52805');
  });
});
