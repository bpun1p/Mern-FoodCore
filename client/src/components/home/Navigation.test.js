import * as React from 'react';
import { render, fireEvent, queryByTestId } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import Navigation from './Navigation';

test('renders the correct content', () => {
  const mockFunction = jest.fn();
  const { getByTestId, getByText } = render (
    <Navigation popUpHandler={mockFunction}/>, { wrapper: BrowserRouter }
  );
    
  expect(getByText('LOGIN')).not.toBeNull();
  expect(getByText('SIGN UP')).not.toBeNull();
  expect(getByText('ABOUT ME')).not.toBeNull();    
  expect(getByTestId('exitNavBtn')).not.toBeNull();
});

test('exit navigation button is clicked, popuphandler is called', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render (
      <Navigation popUpHandler={mockFunction}/>, { wrapper: BrowserRouter }
    );
 
    fireEvent.click(getByTestId('exitNavBtn'));

    expect(mockFunction).toHaveBeenCalledTimes(1);
});

