import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../service/AuthService';

export default function SignUpForm() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [isMatch, setMatch] = useState(true);
  const [isEmpty, setEmpty] = useState(false);
  const [confirmInput, setConfirmInput] = useState({ usernameConfirm: '', passwordConfirm: '' });
  const [errMessage, setErrMessage] = useState('');

  const history = useHistory();

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const setConfirmation = (event) => {
    setConfirmInput({ ...confirmInput, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    setUser({ username: '', password: '' });
  };

  function refreshPage() {
    window.location.reload();
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (user.username !== ''
        && confirmInput.usernameConfirm !== ''
        && user.password !== ''
        && confirmInput.passwordConfirm !== '') {
      if (user.username !== confirmInput.usernameConfirm
        || user.password !== confirmInput.passwordConfirm) {
        setMatch(false);
        setEmpty(false);
      } else {
        AuthService.register(user)
          .then((data) => {
            const { message } = data;
            resetForm();
            if (!message.msgError) {
              history.push('/login');
            } else {
              setErrMessage(message.msgBody);
            }
          })
          .then(() => {
            if (window.location.pathname === '/login') refreshPage();
          });
      }
    } else {
      setEmpty(true);
    }
  };

  return (
    <div className="sign-up">
      <h1 className="sign-up__header" data-testid="sign-up-title">Sign Up</h1>
      <form id="sign-up__form" onSubmit={onSubmit}>
        <div className="sign-up__inputs">
          <input
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            className="sign-up__email"
            data-testid="username"
            onChange={onChange}
          />
          <input
            placeholder="Re-enter Username"
            type="text"
            id="username-confirm"
            name="usernameConfirm"
            className="sign-up__e-confirm"
            data-testid="username-confirm"
            onChange={setConfirmation}
          />
          <input
            placeholder="Choose a password"
            type="password"
            id="password"
            name="password"
            className="sign-up__password"
            onChange={onChange}
            data-testid="password"
          />
          <input
            placeholder="Re-enter password"
            type="password"
            id="password-confirm"
            name="passwordConfirm"
            className="sign-up__pass-confirm"
            data-testid="password-confirm"
            onChange={setConfirmation}
          />
        </div>
        {isMatch === false
          ? <h1>username or password do not match</h1>
          : null}
        {isEmpty
          ? <h1>please fill in all feilds</h1>
          : null}
        {errMessage !== ''
          ? <h1>{errMessage}</h1>
          : null}
        <input type="submit" value="Sign Up" className="form__submit-btn" data-testid="sign-up-btn" />
      </form>
    </div>
  );
}
