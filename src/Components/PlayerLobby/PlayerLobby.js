import React, { useState, useEffect } from 'react';
import Body from '../Body/Body';
import { useHistory, useLocation } from 'react-router-dom';

import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import css from './PlayerLobby.module.css';

import useApiGetResult from "../../hooks/useLoading";
import { postToApi } from '../../utils/apiLayer';
import { currency } from "../../utils/constants";
import WagerCard from '../WagerCard/WagerCard';
import { useWebsocket } from "../../hooks/useWebsocket";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 80,
    border: '1px solid #00000026'
  }
});

const PlayerLobby = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state = {} } = useLocation();
  const { sessionInfo } = state;
  const { raceDayId } = sessionInfo;

  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState({ error: false, messages: [] });
  const raceDayEndpoint = `/raceday/${raceDayId}`;

  const [raceDayData, isRaceDataLoading, raceDataApiError] = useApiGetResult({ races: [] }, raceDayEndpoint);
  const [playerData, isPlayerDataLoading, playerDataApiError] = useApiGetResult([], `${raceDayEndpoint}/leaderboard`);
  const [placeBetText, setPlaceBetText] = useState('Place Bet');

  const [advanceToRace] = useWebsocket('/eventstate');

  useEffect(() => {
    if (advanceToRace === 'started') {
      history.push('/Race',
        {
          race: getNextRace(),
          sessionInfo
        });
    }
  }, [advanceToRace])

  const getNextRace = () => {
    return raceDayData.races.find((race) => {
      return race.state === "not-started"
    });
  }

  useEffect(() => {
    setIsLoading(isRaceDataLoading || isPlayerDataLoading);
  }, [isRaceDataLoading, isPlayerDataLoading]);

  useEffect(() => {
    const messages = [raceDataApiError, playerDataApiError].filter(message => message);
    setApiError({
      error: !!raceDataApiError && !!playerDataApiError,
      messages,
    });
  }, [raceDataApiError, playerDataApiError]);

  const handlePlaceBet = async () => {
    setPlaceBetText('Update Bet');
    const raceCard = getNextRace();
    const wagers = raceCard.horses.filter(horse => {
      return (horse.bet);
    }).map(horse => {
      return {
        player: sessionInfo.playerId,
        race: raceCard._id,
        horseNumber: horse.number,
        amount: horse.bet
      }
    });

    await postToApi('/wagers', {
      player: sessionInfo.playerId,
      wagers: wagers
    });
  };

  return (
    <Body>
      <div className={css.pageContainer}>
        {isLoading ? (
          <div>Loading.....Please Wait</div>
        ) : apiError.error ? (
          <div>
            <p>There was an error retrieving the data for this race!</p>
            {apiError.messages
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
                <div className={css.raceCardContainer}>
                  <WagerCard raceCard={getNextRace()}>

                  </WagerCard>

                </div>
                <div className={css.buttonContainer}>
                  <Card className={classes.root} onClick={handlePlaceBet}>
                    <div>{placeBetText}</div>
                  </Card>
                </div>
              </>
            )}
      </div>
    </Body>
  );
};

export default PlayerLobby;
