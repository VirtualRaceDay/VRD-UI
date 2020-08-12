import React, { useState, useEffect, useCallback } from 'react';
import Body from '../Body/Body';
import { useHistory, useLocation } from 'react-router-dom';

import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import css from './PlayerLobby.module.css';

import useApiGetResult from "../../hooks/useLoading";
import { postToApi } from '../../utils/apiLayer';
import WagerCard from '../WagerCard/WagerCard';
import { useWebsocket } from "../../hooks/useWebsocket";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 80,
    border: '1px solid #00000026',
    '&:hover, &:focus': {
      backgroundColor: '#fafafa',
      cursor: 'pointer',
    },
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
  const [currentPlayerBalance, setCurrentPlayerBalance] = useState(0);

  const [advanceToRace] = useWebsocket('/eventstate');

  useEffect(() => {
    if (advanceToRace === 'started') {
      history.push('/Race',
        {
          race: getNextRace(),
          isLastRace: isLastRace(),
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

  const isLastRace = () => {
    return (raceDayData.races.filter(race => {
      return race.state === 'not-started'
    }).length === 1)
  }

  const handleBetsChanged = () => {
    const wagers = getWagers();

    //Replace with the current balance of the player when this feature has been implemented.
    let currentBalance = parseFloat(raceDayData.initialStake);
    let wagerValues = aggregateWagerValues(wagers);

    setCurrentPlayerBalance(currentBalance - wagerValues);
  }

  const getWagers = () => {
    const raceCard = getNextRace();

    return raceCard.horses.filter(horse => {
      return (horse.bet);
    }).map(horse => {
      return {
        player: sessionInfo.playerId,
        race: raceCard._id,
        horseNumber: horse.number,
        amount: horse.bet
      }
    });
  }

  const handlePlaceBet = async () => {
    setPlaceBetText('Update Bet');
    const wagers = getWagers();

    await postToApi('/wagers', {
      player: sessionInfo.playerId,
      race: getNextRace()._id,
      wagers: wagers
    });
  };

  const aggregateWagerValues = (wagers) => wagers.reduce((accum, item) => parseFloat(accum) + parseFloat(item.amount), 0);

  const getBasePlayerBalance = () => playerData.players.find(x => x._id === sessionInfo.playerId).currentFunds;

  useEffect(() => {
    if (playerData.players !== undefined)
      setCurrentPlayerBalance(getBasePlayerBalance());
  }, [isPlayerDataLoading]);



  return (
    <Body>
      <div className={css.pageContainer}>
        {isLoading && isPlayerDataLoading ? (
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
                <div className={css.balance}>Balance: £{currentPlayerBalance}</div>
                <div className={css.raceCardContainer}>
                  <WagerCard raceCard={getNextRace()} callback={handleBetsChanged}>

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
