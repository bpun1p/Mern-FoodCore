import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AuthService from '../../service/AuthService';

export default function LoginForm() {
  const [username, setUsername] = useState({ username: '' });
  const [isValidEntry, setValidEntry] = useState(true);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const onChange = (event) => {
    setUsername({ ...username, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (username.username !== '') {
      AuthService.login(username)
        .then((data) => {
          const { isAuthenticated, user } = data;
          if (isAuthenticated) {
            authContext.setUser(user);
            authContext.setIsAuthenticated(isAuthenticated);
            history.push('/dashboard/global');
          } else setValidEntry(false);
        });
    } else setValidEntry(false);
  };

  return (
    <div className="login">
      <h1 data-testid="login-title" className="login__header">Login</h1>
      <form className="login__form" onSubmit={onSubmit}>
        <div className="login__inputs">
          <input
            data-testid="username"
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            className="login__email"
            onChange={onChange}
          />
          <input
            data-testid="password"
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            className="login__password"
            onChange={onChange}
          />
        </div>
        {!isValidEntry
          ? <h1 className="invalid__input">Invalid username or password</h1>
          : null}
        <button type="submit" value="Login" data-testid="login-btn" className="form__submit-btn">Login</button>
      </form>
    </div>
  );
}
