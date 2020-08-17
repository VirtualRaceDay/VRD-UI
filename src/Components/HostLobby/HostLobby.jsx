import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import PlayerIdentifier from '../PlayerIdentifier/PlayerIdentifier';
import Body from '../Body/Body';
import { useWebsocket } from "../../hooks/useWebsocket";
import useApiGetResult from "../../hooks/useLoading";
import { putToApi } from "../../utils/apiLayer";

import css from './HostLobby.module.css';

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
  },
});

const HostLobby = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state = {} } = useLocation();

  const { sessionInfo } = state;
  const { lobbyId } = sessionInfo;

  const [raceData, isLoading] = useApiGetResult({ races: [] }, `/raceday/${lobbyId}`);
  const [incomingPlayer] = useWebsocket('/playerlist');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (incomingPlayer.name) {
      setPlayers(p => [...p, incomingPlayer]);
    }
  }, [incomingPlayer]);

  const getNextRace = () => {
    const nextRace = raceData.races.find((race) => {
      return race.state === 'not-started'
    });

    return nextRace;
  }

  const nextRace = getNextRace();

  const isFirstRace = () => {
    return raceData.races[0].state === 'not-started'
  };

  const isLastRace = () => {
    return (raceData.races.filter(race => {
      return race.state === 'not-started'
    }).length === 1)
  }

  const hasAnotherRace = () => {

    return (nextRace !== undefined);
  }

  const startNextRaceClick = async () => {
    // Set race next started
    const response = await putToApi(`/race/${nextRace._id}/start`);

    if (!response.error) {
      history.push({
        pathname: '/race',
        state: {
          race: nextRace._id,
          isHost: true,
          isLastRace: isLastRace(),
          sessionInfo
        },
      });
    };
  }

  const handleOnFinishClick = () => {
    history.push('/Host');
  };

  return (
    <Body>
      <div className={css.pageContainer}>
        {isLoading ? (
          <h1>Loading race data...</h1>
        )
          : (
            <>
              {hasAnotherRace() ? (
                <>
                  <h5>{raceData.name} - {raceData.races.length} RACES</h5>
                  {isFirstRace() ?
                    (<h3>The first race is - {nextRace.name}</h3>)
                    : (<h3> The next race is - {nextRace.name}</h3>)
                  }
                  <h3>Place Your Bets!</h3>
                  {isFirstRace() ? (
                    <>
                      <h1>Game PIN: {raceData.pin}</h1>
                      <div className={css.players}>
                        {!players.length ? (
                          <h4>Waiting for players</h4>
                        ) : (
                            <ul>
                              {players.mapOrDefault(false,
                                (player, idx) => (
                                  <li key={idx}>{<PlayerIdentifier name={player.name} />}</li>
                                ))}
                            </ul>
                          )}
                      </div>
                    </>
                  ) : ('')}

                </>
              ) : (<div>
                Event Complete
              </div>)}

              <div className={css.buttonContainer}>
                {!hasAnotherRace() ?
                  (
                    <div className={css.finishContainer}>
                      <Card className={classes.root} onClick={handleOnFinishClick}>
                        <div>Finish Event</div>
                      </Card>
                    </div>
                  )
                  : (
                    <div className={css.beginContainer}>
                      <Card
                        type="submit"
                        className={classes.root}
                        onClick={startNextRaceClick}
                      >
                        <div>Begin Next Race</div>
                      </Card>
                    </div>
                  )}
              </div>
            </>
          )}
      </div>
    </Body>
  );
};

export default HostLobby;
