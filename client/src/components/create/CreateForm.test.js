import * as React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthService from '../../service/AuthService';
import ReceipeService from '../../service/ReceipeService';
import AuthProvider from '../../context/AuthContext';
import CreateForm from './CreateForm';
import ImageCompressor from '../utils/ImageCompressor';
import ToBase64 from '../utils/ToBase64';

jest.mock('../../service/AuthService');
jest.mock('../utils/ImageCompressor');
jest.mock('../utils/ToBase64');
jest.mock('../../service/ReceipeService');


const mockHistoryPush = jest.fn();
global.URL.createObjectURL = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));

test('renders content correctly', async () => {
    const authenticatedResponse = {isAuthenticated: true, user: {username: 'Bpun1p'}};
    AuthService.isAuthenticated.mockResolvedValue(authenticatedResponse);

    const { getByTestId, getByText } = render(<CreateForm />, {wrapper: AuthProvider});

    await act(() => Promise.resolve());
    
    expect(getByTestId('image-input')).not.toBeNull();
    expect(getByText("Receipe's Name:")).toBeInTheDocument();
    expect(getByTestId('receipe-name-text-field')).not.toBeNull();
    expect(getByText("Description:")).toBeInTheDocument();
    expect(getByTestId('description-text-field')).not.toBeNull();
    expect(getByText("INGREDIENTS")).toBeInTheDocument();
    expect(getByTestId('ingredient-textField')).not.toBeNull();
    expect(getByTestId('add-ingredient-button')).not.toBeNull();
    expect(getByText("INSTRUCTIONS")).toBeInTheDocument();
    expect(getByTestId('instruction-textField')).not.toBeNull();
    expect(getByTestId('add-instruction-button')).not.toBeNull();
    expect(getByText('Create')).toHaveAttribute('type', 'submit');
})

describe('add ingredients form', () => {

    beforeEach(() => {
        const authenticatedResponse = {isAuthenticated: true, user: {username: 'Bpun1p'}};
        AuthService.isAuthenticated.mockResolvedValue(authenticatedResponse);
    });

    test('empty input will display and invalid text', async () => {
        const { getByTestId, getByText } = render(<CreateForm />, {wrapper: AuthProvider});
    
        await act(() => Promise.resolve());
        fireEvent.click(getByTestId('add-ingredient-button'))

        expect(getByText('input valid entry')).toBeInTheDocument();
    });
    test('inputting text and submitting should display on DOM', async () => {
        const { getByTestId, getByText } = render(<CreateForm />, {wrapper: AuthProvider});

        await act(() => Promise.resolve());

        fireEvent.change(getByTestId('ingredient-textField'), {target: {value: 'chicken breast'}});
        fireEvent.click(getByTestId('add-ingredient-button'))

        expect(getByText('chicken breast')).toBeInTheDocument();
    });
});

describe('add instructions form', () => {

    beforeEach(() => {
        const authenticatedResponse = {isAuthenticated: true, user: {username: 'Bpun1p'}};
        AuthService.isAuthenticated.mockResolvedValue(authenticatedResponse);
    });

    test('empty input will display an error message ', async () => {
        const { getByTestId, getByText } = render(<CreateForm />, {wrapper: AuthProvider});
    
        await act(() => Promise.resolve());
        fireEvent.click(getByTestId('add-instruction-button'))

        expect(getByText('input valid entry')).toBeInTheDocument();
    });
    test('inputting text and submitting should display on dom', async () => {
        const { getByTestId, getByText } = render(<CreateForm />, {wrapper: AuthProvider});

        await act(() => Promise.resolve());

        fireEvent.change(getByTestId('instruction-textField'), {target: {value: 'Bake a 4-oz. chicken breast at 350°F (177˚C) for 25 to 30 minutes'}});
        fireEvent.click(getByTestId('add-instruction-button'));

        expect(getByText('Bake a 4-oz. chicken breast at 350°F (177˚C) for 25 to 30 minutes')).toBeInTheDocument();
    });
});

describe('image uploader', () => {

    beforeEach(() => {
        const authenticatedResponse = {isAuthenticated: true, user: {username: 'Bpun1p'}};
        AuthService.isAuthenticated.mockResolvedValue(authenticatedResponse);
    });

    test('uploading a non image file should return error message', async () => {
        const { getByTestId, getByText } = render(<CreateForm />, {wrapper: AuthProvider});

        await act(() => Promise.resolve());
        
        const file = new File(['foo'], 'foo.txt', {type: 'text/plain'})

        const imageInput = getByTestId('image-input');
        fireEvent.change(imageInput, {target: {files: [file]}});

        await act(() => Promise.resolve());

        expect(getByText('unable to convert image file')).toBeInTheDocument();
    })
    test('uploading a image file should display an image onto the Dom', async () => {
        const file = new File(['(⌐□_□)'], 'coolGuy.png', {type: 'image/png'});
        const fakeBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQUFBAYFB'
        ImageCompressor.mockResolvedValue(file);
        ToBase64.mockResolvedValue(fakeBase64);

        const { getByTestId, getByText } = render(<CreateForm />, {wrapper: AuthProvider});

        await act(() => Promise.resolve());

        fireEvent.change(getByTestId('image-input'), {target: {files: [file]}});

        await act(() => Promise.resolve());

        expect(getByTestId('displayed-image')).toBeInTheDocument();
    })
})

describe('Create receipe button', () => {

    beforeEach(() => {
        const authenticatedResponse = {isAuthenticated: true, user: {username: 'Bpun1p'}};
        AuthService.isAuthenticated.mockResolvedValue(authenticatedResponse);
    });

    test('when click with no inputs will display a error message in the DOM', async () => {
        const { getByText } = render(<CreateForm />, {wrapper: AuthProvider});

        await act(() => Promise.resolve());

        fireEvent.click(getByText('Create'));

        expect(getByText('Please fill in all feilds')).toBeInTheDocument();
    });
    test('when clicked with some filled inputs will display an error message in the DOM', async () => {
        const { getByText, getByTestId } = render(<CreateForm />, {wrapper: AuthProvider});

        await act(() => Promise.resolve());

        fireEvent.change(getByTestId('receipe-name-text-field'), {target: {value: 'Chicken Pot Pie'}});
        fireEvent.change(getByTestId('description-text-field'), {target: {value: 'A delicious chicken pie made from scratch with carrots, peas and celery.'}});
        fireEvent.change(getByTestId('ingredient-textField'), {target: {value: 'chicken breast'}});

        fireEvent.click(getByTestId('add-ingredient-button'));

        fireEvent.click(getByText('Create'));

        expect(getByText('Please fill in all feilds')).toBeInTheDocument();
    });
    test('when clicked with fully filled input will send user back to their dashboard', async () => {
        const file = new File(['(⌐□_□)'], 'coolGuy.png', {type: 'image/png'});
        const fakeBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQUFBAYFB';
        const successResponse = { message: { msgBody: 'post successful', msgError: false }};

        ReceipeService.postAllReceipes.mockResolvedValue(successResponse);
        ReceipeService.postReceipe.mockResolvedValue(successResponse);
        ImageCompressor.mockResolvedValue(file);
        ToBase64.mockResolvedValue(fakeBase64);

        const { getByText, getByTestId } = render(<CreateForm />, {wrapper: AuthProvider});

        await act(() => Promise.resolve()); 

        fireEvent.change(getByTestId('image-input'), {target: {files: [file]}});
        await act(() => Promise.resolve());

        fireEvent.change(getByTestId('receipe-name-text-field'), {target: {value: 'Chicken Pot Pie'}});
        fireEvent.change(getByTestId('description-text-field'), {target: {value: 'A delicious chicken pie made from scratch with carrots, peas and celery.'}});

        fireEvent.change(getByTestId('ingredient-textField'), {target: {value: 'chicken breast'}});
        fireEvent.click(getByTestId('add-ingredient-button'));

        fireEvent.change(getByTestId('instruction-textField'), {target: {value: 'Bake a 4-oz. chicken breast at 350°F (177˚C) for 25 to 30 minutes'}});
        fireEvent.click(getByTestId('add-instruction-button'));
        
        fireEvent.click(getByText('Create'));

        await act(() => Promise.resolve())

        expect(mockHistoryPush).toHaveBeenCalled();
        expect(mockHistoryPush).toHaveBeenCalledWith('/profile/global')
    })
});