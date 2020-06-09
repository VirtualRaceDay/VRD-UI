import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import css from './App.module.css';
import LandingPage from './Components/LandingPage/LandingPage';
import PageNotFound from './Components/ErrorPages/PageNotFound';
import Header from './Components/Header/Header';

function App() {
  return (
    <div>
      <Router>
        <div className={css.App}>
          <Header />
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
