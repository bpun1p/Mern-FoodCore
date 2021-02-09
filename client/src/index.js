import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/home/Home';
import Entry from './components/entry/Entry';
import AboutMe from './components/about-me/AboutMe';
import AuthProvider from './context/AuthContext';
import Dashboard from './components/dashboard/Dashboard';
import Groundwork from './components/groundwork/Groundwork';
import store from './store';

ReactDOM.render(
  <AuthProvider>
    <Provider store={store}>
      <React.StrictMode>
        <Router>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about-Me" component={AboutMe} exact />
            <Route path="/groundwork" component={Groundwork} exact />
            <Route path={['/login', '/register']} component={Entry} exact />
            <Route path={['/dashboard/global', '/dashboard/my-posts', '/dashboard/create']} component={Dashboard} exact />
          </Switch>
        </Router>
      </React.StrictMode>
    </Provider>
  </AuthProvider>,
  document.getElementById('root'),
);
