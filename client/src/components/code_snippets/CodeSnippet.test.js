import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Groundwork from './Groundwork';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders content correctly', () => {
    const { getByTestId, getByText } = render(<Groundwork />, { wrapper: BrowserRouter });

    expect(getByText('GROUNDWORKS')).toBeInTheDocument();
    expect(getByText('(Click to view sample code base)')).toBeInTheDocument();
    expect(getByTestId('home')).not.toBeNull();
    expect(getByTestId('entry')).not.toBeNull();
    expect(getByTestId('dashboardRecipes')).not.toBeNull();
    expect(getByTestId('recipeModal')).not.toBeNull();
    expect(getByTestId('createForm')).not.toBeNull();
    expect(getByTestId('codeSnippets')).not.toBeNull();
});

describe('when images are clicked, modal of codebase should pop up', () => {
    
    test('cover page image is clicked', () => {
        const { getByTestId, getAllByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

        fireEvent.click(getByTestId('home'));

        expect(getByTestId('exit-modal-btn')).toBeInTheDocument();
        expect(getAllByTestId('codebase-img').length).toEqual(6);
    });
    test('entry page image is clicked', () => {
        const { getByTestId, getAllByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

        fireEvent.click(getByTestId('entry'));

        expect(getByTestId('exit-modal-btn')).toBeInTheDocument();
        expect(getAllByTestId('codebase-img').length).toEqual(5);
    });
    test('dashboard image is clicked', () => {
        const { getByTestId, getAllByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

        fireEvent.click(getByTestId('dashboardRecipes'));

        expect(getByTestId('exit-modal-btn')).toBeInTheDocument();
        expect(getAllByTestId('codebase-img').length).toEqual(5);
    });
    test('modal image is clicked', () => {
        const { getByTestId, getAllByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

        fireEvent.click(getByTestId('recipeModal'));

        expect(getByTestId('exit-modal-btn')).toBeInTheDocument();
        expect(getAllByTestId('codebase-img').length).toEqual(3);
    });
    test('create recipe form image is clicked', () => {
        const { getByTestId, getAllByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

        fireEvent.click(getByTestId('createForm'));

        expect(getByTestId('exit-modal-btn')).toBeInTheDocument();
        expect(getAllByTestId('codebase-img').length).toEqual(4);
    });
    test('code snippets image is clicked', () => {
        const { getByTestId, getAllByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

        fireEvent.click(getByTestId('codeSnippets'));

        expect(getByTestId('exit-modal-btn')).toBeInTheDocument();
        expect(getAllByTestId('codebase-img').length).toEqual(2);
    });
});

test('exit icon closes the modal', () => {
    const { getByTestId, queryByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

    fireEvent.click(getByTestId('cover-img'));

    expect(getByTestId('exit-modal-btn')).toBeInTheDocument();

    fireEvent.click(getByTestId('exit-modal-btn'));

    expect(queryByTestId('exit-modal-btn')).not.toBeInTheDocument();
});
