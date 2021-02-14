import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Groundwork from './Groundwork';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders content correctly', () => {
    const { getByTestId, getByText } = render(<Groundwork />, { wrapper: BrowserRouter });

    expect(getByText('GROUNDWORKS')).toBeInTheDocument();
    expect(getByText('(Click to view sample code base)')).toBeInTheDocument();
    expect(getByTestId('cover-img')).not.toBeNull();
    expect(getByTestId('entry-img')).not.toBeNull();
    expect(getByTestId('all-recipes-img')).not.toBeNull();
    expect(getByTestId('modal-img')).not.toBeNull();
    expect(getByTestId('create-form-img')).not.toBeNull();
});

describe('when images are clicked, modal of codebase should pop up', () => {
    
    test('cover-img is clicked', () => {
        const { getByTestId, getAllByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

        fireEvent.click(getByTestId('home'));

        expect(getByTestId('exit-modal-btn')).toBeInTheDocument();
        expect(getAllByTestId('codebase-img').length).toEqual(6);
    });
    test('entry-img is clicked', () => {
        const { getByTestId, getAllByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

        fireEvent.click(getByTestId('entry'));

        expect(getByTestId('exit-modal-btn')).toBeInTheDocument();
        expect(getAllByTestId('codebase-img').length).toEqual(5);
    });
    test('all-recipes-img is clicked', () => {
        const { getByTestId, getAllByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

        fireEvent.click(getByTestId('dashboardRecipes'));

        expect(getByTestId('exit-modal-btn')).toBeInTheDocument();
        expect(getAllByTestId('codebase-img').length).toEqual(5);
    });
    test('modal-img is clicked', () => {
        const { getByTestId, getAllByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

        fireEvent.click(getByTestId('recipeModal'));

        expect(getByTestId('exit-modal-btn')).toBeInTheDocument();
        expect(getAllByTestId('codebase-img').length).toEqual(3);
    });
    test('create-form-img is clicked', () => {
        const { getByTestId, getAllByTestId } = render(<Groundwork />, { wrapper: BrowserRouter });

        fireEvent.click(getByTestId('createForm'));

        expect(getByTestId('exit-modal-btn')).toBeInTheDocument();
        expect(getAllByTestId('codebase-img').length).toEqual(4);
    });
    test('create-form-img is clicked', () => {
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