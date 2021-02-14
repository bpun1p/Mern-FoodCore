import *  as React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';
import AuthService from '../../service/AuthService';

jest.mock('../../service/AuthService');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
}));

test('renders the correct content', () => {
    const { getByTestId, getByText } = render(<SignUpForm />);

    expect(getByTestId('sign-up-title').textContent).toEqual('Sign Up');
    expect(getByTestId('username')).not.toBeNull();
    expect(getByTestId('password')).not.toBeNull();
    expect(getByTestId('username-confirm')).not.toBeNull();
    expect(getByTestId('password-confirm')).not.toBeNull();
    expect(getByTestId('sign-up-btn')).not.toBeNull();
    expect(getByText('Or sign up with')).not.toBeNull();
    expect(getByTestId('facebook-icon')).not.toBeNull();
    expect(getByTestId('google-icon')).not.toBeNull();
});
describe('when user inputs information into sign up form', () => {
    test('no inputs should output an invalid response', () => {
        const { getByTestId, getByText } = render(<SignUpForm />);

        fireEvent.click(getByTestId('sign-up-btn'));

        expect(getByText('please fill in all feilds')).toBeInTheDocument();
    });
    test('inputs some fields should output an invalid response', () => {
        const { getByTestId, getByText } = render(<SignUpForm />);

        fireEvent.change(getByTestId('username'), {target: {value: 'fakeUsername'}});
        fireEvent.change(getByTestId('password'), {target: {value: 'fakePassword'}});

        fireEvent.click(getByTestId('sign-up-btn'));

        expect(getByText('please fill in all feilds')).toBeInTheDocument();
    });
    test('inputs dont match should output invalid response', () => {
        const { getByTestId, getByText } = render(<SignUpForm />);

        fireEvent.change(getByTestId('username'), {target: {value: 'fakeUsername'}});
        fireEvent.change(getByTestId('username-confirm'), {target: {value: 'falseMatch'}});
        fireEvent.change(getByTestId('password'), {target: {value: 'fakePassword'}});
        fireEvent.change(getByTestId('password-confirm'), {target: {value: 'falseMatch'}});

        fireEvent.click(getByTestId('sign-up-btn'));

        expect(getByText('username or password do not match')).toBeInTheDocument();
    });
    test('correct inputs should call push to login page', async () => {
        const { getByTestId } = render(<SignUpForm />);

        const successResponse =  { message: { msgBody: 'account successfully created', msgError: false } };
        AuthService.register.mockResolvedValue(successResponse);

        fireEvent.change(getByTestId('username'), {target: {value: 'fakeUsername'}});
        fireEvent.change(getByTestId('username-confirm'), {target: {value: 'fakeUsername'}});
        fireEvent.change(getByTestId('password'), {target: {value: 'fakePassword'}});
        fireEvent.change(getByTestId('password-confirm'), {target: {value: 'fakePassword'}});

        await act(() => fireEvent.click(getByTestId('sign-up-btn')));
        expect(mockHistoryPush).toHaveBeenCalledWith('/login');
        expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    });
    test('inputs that already exist in the database should output error message', async () => {
        const { getByTestId, getByText } = render(<SignUpForm />);

        const errorResponse =  { message: { msgBody: 'username is already used', msgError: true } };
        AuthService.register.mockResolvedValue(errorResponse);

        fireEvent.change(getByTestId('username'), {target: {value: 'fakeUsername'}});
        fireEvent.change(getByTestId('username-confirm'), {target: {value: 'fakeUsername'}});
        fireEvent.change(getByTestId('password'), {target: {value: 'fakePassword'}});
        fireEvent.change(getByTestId('password-confirm'), {target: {value: 'fakePassword'}});

        await act(() => fireEvent.click(getByTestId('sign-up-btn')));

        expect(getByText('username is already used')).toBeInTheDocument();
    });
    test('inputs made in /login path should refresh page', async () => {
        delete window.location;
        window.location = new URL("http://localhost:3000/login");
        window.location.reload = jest.fn();

        const { getByTestId} = render(<SignUpForm />);

        const successResponse =  { message: { msgBody: 'account successfully created', msgError: false } };

        AuthService.register.mockResolvedValue(successResponse);

        fireEvent.change(getByTestId('username'), {target: {value: 'fakeUsername'}});
        fireEvent.change(getByTestId('username-confirm'), {target: {value: 'fakeUsername'}});
        fireEvent.change(getByTestId('password'), {target: {value: 'fakePassword'}});
        fireEvent.change(getByTestId('password-confirm'), {target: {value: 'fakePassword'}});

        await act(() => fireEvent.click(getByTestId('sign-up-btn')));

        expect(window.location.reload).toHaveBeenCalled();
    });
});
