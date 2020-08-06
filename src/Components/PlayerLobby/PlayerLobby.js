import React, { useState, useEffect } from 'react';
import Body from '../Body/Body';
import { useHistory, useLocation } from 'react-router-dom';

import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import css from './PlayerLobby.module.css';

import useApiGetResult from "../../hooks/useLoading";
import { currency } from "../../utils/constants";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 80,
    border: '1px solid #00000026',
  },
});

const PlayerLobby = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state = {} } = useLocation();
  const { raceDayId } = state;

  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState({ error: false, messages: []});
  const raceDayEndpoint = `/raceday/${raceDayId}`;

  const [raceDayData, isRaceDataLoading, raceDataApiError] = useApiGetResult({ races: [] }, raceDayEndpoint);
  const [playerData, isPlayerDataLoading, playerDataApiError] = useApiGetResult([], `${raceDayEndpoint}/leaderboard`);

  useEffect(() => {
    setIsLoading(isRaceDataLoading || isPlayerDataLoading);
  }, [isRaceDataLoading, isPlayerDataLoading]);

  useEffect(() => {
    const messages = [ raceDataApiError, playerDataApiError ].filter(message => message);
    setApiError({
      error: !!raceDataApiError && !!playerDataApiError,
      messages,
    });
  }, [raceDataApiError, playerDataApiError]);

  const handleOnJoinClick = () => {
    history.push('/Race');
  };

  return (
    <Body>
      <div className={css.pageContainer}>
        { isLoading ? (
          <div>Loading.....Please Wait</div>
        ) : apiError.error ? (
          <div>
            <p>There was an error retrieving the data for this race!</p>
            { apiError.messages
              .filter(message => message)
              .map((message, idx) => (
                <p key={idx}>{message}</p>
            ))}
          </div>
        ) : (
          <>
            <h5>{raceDayData.name} - {raceDayData.races.length} RACES</h5>
            <h1>Game PIN: {raceDayData.pin}</h1>
            <div className={css.balance}>Balance: {currency[raceDayData.currency]}{playerData.currentFunds}</div>
            <div className={css.raceCardContainer}>Next Race Card</div>
            <div className={css.buttonContainer}>
              <Card className={classes.root} onClick={handleOnJoinClick}>
                <div>Place Bet</div>
              </Card>
            </div>
          </>
        )}
      </div>
    </Body>
  );
};

export default PlayerLobby;
