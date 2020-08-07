import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import css from "./App.module.css";

import PageNotFound from "./Components/ErrorPages/PageNotFound";
import Header from "./Components/Header/Header";
import LandingPage from "./Components/LandingPage/LandingPage";
import HostPage from "./Components/HostPage/HostPage";
import JoinPage from "./Components/JoinPage/JoinPage";
import HostLobby from "./Components/HostLobby/HostLobby";
import PlayerLobby from "./Components/PlayerLobby/PlayerLobby";
import RacePage from "./Components/RacePage/RacePage";
import Leaderboard from "./Components/Leaderboard/Leaderboard";

const App = () => (
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
        <Route exact path="/HostLobby">
          <HostLobby />
        </Route>
        <Route exact path="/PlayerLobby">
          <PlayerLobby />
        </Route>
        <Route exact path="/Race">
          <RacePage />
        </Route>
        <Route exact path="/Leaderboard">
          <Leaderboard />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
