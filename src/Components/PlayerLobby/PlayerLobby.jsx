import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, ToastMessage } from 'react-toastr';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import Body from '../Body/Body';
import useApiGetResult from "../../hooks/useLoading";
import WagerCard from '../WagerCard/WagerCard';
import { postToApi } from '../../utils/apiLayer';
import { useWebsocket } from "../../hooks/useWebsocket";
import css from './PlayerLobby.module.css';
import './toastr.min.css';
import './animate.min.css';

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
    let toastrContainer;
    const classes = useStyles();
    const history = useHistory();
    const { state = {} } = useLocation();
    const { sessionInfo } = state;
    const { raceDayId } = sessionInfo;
    const raceDayEndpoint = `/raceday/${raceDayId}`;

    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState({ error: false, messages: [] });
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

        const currentBalance = getBasePlayerBalance();
        const wagerValues = aggregateWagerValues(wagers);

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

    const handlePlaceBet = async (toastrContainer) => {
        const wagers = getWagers();
        const wagerValues = aggregateWagerValues(wagers);
        const playerBalance = getBasePlayerBalance();

        function onSuccess(wagers) {
            setPlaceBetText('Update Bet');

            toastrContainer.success('Bets placed', 'It worked!', {
                timeOut: 2000
            });
        }

        function onError(errorMessage) {
            setPlaceBetText('Place Bet');

            toastrContainer.error(errorMessage, 'Something went wrong!', {
                timeOut: 2000
            });
        }

        if(wagerValues > playerBalance) {
          onError('Not enough funds to place wager');
        } else {
          const raceCard = getNextRace();
          const response = await postToApi('/wagers', {

            player: sessionInfo.playerId,
            wagers: wagers,
            race: raceCard._id,
          });
          console.log(sessionInfo.playerId)
          console.log(response);

          if (response.data.wagers && response.data.wagers.length > 0) {
              onSuccess(response.data.wagers);
          } else {
              onError(response);
          }
        }

        
    };

    const aggregateWagerValues = (wagers) => wagers.reduce((accum, item) => parseFloat(accum) + parseFloat(item.amount), 0);
    const getBasePlayerBalance = () => playerData.players.find(x => x._id === sessionInfo.playerId).currentFunds;

    useEffect(() => {
        if (playerData.players !== undefined) {
            setCurrentPlayerBalance(getBasePlayerBalance());
        }
    }, [isPlayerDataLoading]);

    return (
        <Body>
            <ToastContainer
                ref={ref => toastrContainer = ref}
                className="toast-top-right"
            />

            <div className={css.pageContainer}>
                {(isLoading && isPlayerDataLoading)
                    ? (
                        <div>Loading.....Please Wait</div>
                    )
                    : (apiError.error)
                        ? (
                            <div>
                                <p>There was an error retrieving the data for this race!</p>

                                {apiError.messages
                                    .filter(message => message)
                                    .map((message, idx) => (
                                        <p key={idx}>{message}</p>
                                    ))
                                }
                            </div>
                        ) : (
                            <div>
                                <h5>{raceDayData.name} - {raceDayData.races.length} RACES</h5>

                                <h1>Game PIN: {raceDayData.pin}</h1>

                                <div className={css.balance}>Balance: £{currentPlayerBalance}</div>

                                <div className={css.raceCardContainer}>
                                    <WagerCard raceCard={getNextRace()} callback={handleBetsChanged} />
                                </div>

                                <div className={css.buttonContainer}>
                                    <Card
                                        className={classes.root}
                                        onClick={() => handlePlaceBet(toastrContainer)}
                                        ref={toastrContainer}
                                    >
                                        <div>{placeBetText}</div>
                                    </Card>
                                </div>
                            </div>
                        )
                }
            </div>
        </Body>
    );
};

export default PlayerLobby;
