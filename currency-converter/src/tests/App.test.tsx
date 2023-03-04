import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';


jest.mock('React', () => ({
  ...jest.requireActual('React'),
  useEffect: jest.fn(),
}));

jest.mock('../pastCurrency/pastCurrencyTable', () => ({ PastCurrencyTable: () => 'mocked pastCurrencyTable' }));
jest.mock('../currentCurrency/currentCurrencyTable', () => ({ CurrentCurrencyTable: () => 'mocked currentCurrencyTable' }));

test('renders title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Ryan Fowler's Currency App/i);
  expect(titleElement).toBeInTheDocument();
});

