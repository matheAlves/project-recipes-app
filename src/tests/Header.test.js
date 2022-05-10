import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Header from '../components/Header';
import App from '../App';

const TOP_BTN_TESTID = 'profile-top-btn';
const PAGE_TITLE_TESTID = 'page-title';
const SEARCH_TOP_BTN_TESTID = 'search-top-btn';
const EMAIL = 'email@mail.com';
const PASSWORD = '0123456789';
const EMAIL_INPUT_TESTID = 'email-input';
const PASSWORD_INPUT_TESTID = 'password-input';
const ENTER_BTN_TESTID = 'login-submit-btn';
const EXEC_SEARCH_BTN_TESTID = 'exec-search-btn';

describe('Testa se os elementos do header respeitam os atributos descritos', () => {
  it('Testa se tem o data-testid: profile-top-btn ', () => {
    renderWithRouter(<Header />);

    const profileTopBtn = screen.getByTestId(TOP_BTN_TESTID);

    expect(profileTopBtn).toBeInTheDocument();
  });

  it('Testa se tem o data-testid: page-title', () => {
    renderWithRouter(<Header />);

    const pageTitle = screen.getByTestId(PAGE_TITLE_TESTID);

    expect(pageTitle).toBeInTheDocument();
  });

  it('Testa se tem o data-testid: search-top-btn', () => {
    renderWithRouter(<Header />);

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN_TESTID);

    expect(searchTopBtn).toBeInTheDocument();
  });
});

describe('Testa se a pessoa usuária é redirecionada ao clicar no botão de perfil', () => {
  it('Testa se é redirecionada para a rota /profile', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const enterButton = screen.getByRole('button', { name: /Enter/i });

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    userEvent.click(enterButton);

    const profileBtn = screen.getByRole('button', { name: /Perfil/i });

    userEvent.click(profileBtn);

    expect(history.location.pathname).toBe('/profile');
  });
});

describe('Testa se ao clicar no botão de busca a searchbar é exibida/ocultada', () => {
  it('A barra de busca é exibida ao clicar em Buscar pela primeira vez', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const enterButton = screen.getByTestId(ENTER_BTN_TESTID);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    userEvent.click(enterButton);

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN_TESTID);
    userEvent.click(searchTopBtn);

    const execSearchBtn = screen.getByTestId(EXEC_SEARCH_BTN_TESTID);

    expect(execSearchBtn).toBeInTheDocument();
  });

  it('A barra de busca é ocultada ao clicar em Buscar pela segunda vez', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const enterButton = screen.getByTestId(ENTER_BTN_TESTID);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    userEvent.click(enterButton);

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN_TESTID);
    userEvent.click(searchTopBtn);

    const execSearchBtn = screen.getByTestId(EXEC_SEARCH_BTN_TESTID);
    userEvent.click(searchTopBtn);

    expect(execSearchBtn).not.toBeInTheDocument();
  });
});
