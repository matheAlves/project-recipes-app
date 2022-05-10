import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
// import RecipeDetails from '../pages/RecipeDetails';
import { randomMeals } from './mocks/mocks';
import App from '../App';

const RECIPE_PHOTO_TESTID = 'recipe-photo';
// const RECIPE_TITLE_TESTID = 'recipe-title';
// const SHARE_BTN_TESTID = 'share-btn';
// const FAVORITE_BTN_TESTID = 'favorite-btn';
// const RECIPE_CATEGORY_TESTID = 'recipe-category';
// const INGREDIENTS_TESTID = `${index}-ingredient-name-and-measure`;
// const INSTRUCTIONS_TESTID = 'instructions';
// const VIDEO_TESTID = 'video';
// const RECOMENDATION_CARD_TESTID = `${index}-recomendation-card`;
// const START_RECIPE_BTN_TESTID = 'start-recipe-btn';

describe('Testa a página de receitas', () => {
  beforeEach(() => {
    renderWithRouter(<App />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(randomMeals),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Possui uma foto da receita a ser preparada.', () => {
    const recipePhoto = screen.getByTestId(RECIPE_PHOTO_TESTID);
    console.log(recipePhoto);
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto).toHaveProperty('src', randomMeals.meals[0].strMealThumb);
  });

  // it('Possui um título com o nome da receita.', () => {

  // });

  // it('Possui um botão para compartilhar a receita.', () => {

  // });

  // it('Possui um botão para favoritar a receita.', () => {

  // });

  // it('Possui um texto com a categoria da receita.', () => {

  // });

  // it('Exibe os ingredientes a serem utilizados.', () => {

  // });

  // it('Possui um texto com as instruções de preparo.', () => {

  // });

  // it('Possui um card com receitas recomendadas.', () => {

  // });

  // it('Possui umbotão para iniciar o preparo.', () => {

  // });

  // it('Apenas na tela de comida, possui um vídeo.', () => {

  // });
});
