import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from '../renderWithRouter';

const EMAIL_INPUT_TESTID = 'email-input';
const PASSWORD_INPUT_TESTID = 'password-input';
const ENTER_BTN_TESTID = 'login-submit-btn';
const EMAIL = 'email@mail.com';
const INVALID_EMAIL = 'email@';
const PASSWORD = '0123456789';
const INVALID_PASSWORD = '01234';
const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';
const USER_TOKEN = 'user';

describe('Testa os se os inputs possuem os atributos descritos no protótipo', () => {
  it('Testa se o input de email possui o atributo data-testid="email-input"', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    expect(emailInput).toBeInTheDocument();
  });

  it('Testa se o input de senha possui o atributo data-testid="password-input"', () => {
    renderWithRouter(<Login />);

    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    expect(passwordInput).toBeInTheDocument();
  });

  it('Testa se o botão "Enter" possui o atributo data-testid="login-submit-btn"', () => {
    renderWithRouter(<Login />);

    const enterButton = screen.getByTestId(ENTER_BTN_TESTID);
    expect(enterButton).toBeInTheDocument();
  });
});

describe('Testa se é possível escrever nos inputs de email e senha', () => {
  it('Testa se é possível escrever no input de email', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    userEvent.type(emailInput, EMAIL);

    expect(emailInput).toHaveValue(EMAIL);
  });
  it('Testa se é possível escrever no input de senha', () => {
    renderWithRouter(<Login />);

    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    userEvent.type(passwordInput, PASSWORD);

    expect(passwordInput).toHaveValue(PASSWORD);
  });
});

describe('Testa a validação do formulário', () => {
  it('Testa se o botão estará desativado caso o email for inválido', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const enterButton = screen.getByTestId(ENTER_BTN_TESTID);
    userEvent.type(emailInput, INVALID_EMAIL);

    expect(enterButton).toBeDisabled();
  });

  it('Testa se o botão estará desativado caso o email seja inválido', () => {
    renderWithRouter(<Login />);

    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const enterButton = screen.getByTestId(ENTER_BTN_TESTID);
    userEvent.type(passwordInput, INVALID_PASSWORD);

    expect(enterButton).toBeDisabled();
  });

  it('Testa se o botão estará ativado caso email e senha sejam válidos', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const enterButton = screen.getByTestId(ENTER_BTN_TESTID);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);

    expect(enterButton).toBeEnabled();
  });
});

describe('Testa se mealsToken e cocktailsToken são salvos no localStorage', () => {
  it('Testa se após a submissão os tokens estão salvos no localStorage', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const enterButton = screen.getByTestId(ENTER_BTN_TESTID);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    userEvent.click(enterButton);

    const localStorageMeals = localStorage.getItem(MEALS_TOKEN);
    const localStorageCocktails = localStorage.getItem(COCKTAILS_TOKEN);

    expect(localStorageMeals && localStorageCocktails).toBe('1');
  });
});

describe('Testa se após submissão o e-mail do usuário é salvo no localStorage', () => {
  it('Testa se o email do usuário é salvo na chave user', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const enterButton = screen.getByTestId(ENTER_BTN_TESTID);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    userEvent.click(enterButton);

    const localStorageUser = localStorage.getItem(USER_TOKEN);

    expect(localStorageUser).toBeDefined();
  });
});

describe('Testa se o usuário é redirecionado após login bem sucedido', () => {
  it('Testa se a rota muda para a tela principal de receitas', () => {
    const { history } = renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const enterButton = screen.getByTestId(ENTER_BTN_TESTID);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    userEvent.click(enterButton);

    expect(history.location.pathname).toBe('/foods');
  });
});
