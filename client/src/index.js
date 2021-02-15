import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Entry from './components/entry/Entry';
import AboutMe from './components/about-me/AboutMe';
import AuthProvider from './context/AuthContext';
import Dashboard from './components/dashboard/Dashboard';
import CodeSnippets from './components/code_snippets/CodeSnippets';

ReactDOM.render(
  <AuthProvider>
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about-Me" component={AboutMe} exact />
          <Route path="/code-snippets" component={CodeSnippets} exact />
          <Route path={['/login', '/register']} component={Entry} exact />
          <Route path={['/dashboard/global', '/dashboard/my-posts', '/dashboard/create']} component={Dashboard} exact />
        </Switch>
      </Router>
    </React.StrictMode>
  </AuthProvider>,
  document.getElementById('root'),
);
