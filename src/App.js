import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import css from './App.module.css';
import PageNotFound from './Components/ErrorPages/PageNotFound';
import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage';
import HostPage from './Components/HostPage/HostPage';
import JoinPage from './Components/JoinPage/JoinPage';

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
            <Route exact path="/Host">
              <HostPage />
            </Route>
            <Route exact path="/Join">
              <JoinPage />
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
