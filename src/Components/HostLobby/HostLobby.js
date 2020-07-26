import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import css from './HostLobby.module.css';

import PlayerIdentifier from '../PlayerIdentifier/PlayerIdentifier';
import Body from '../Body/Body';
import { useWebsocket } from "../../hooks/useWebsocket";
import useApiGetResult from "../../hooks/useLoading";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 80,
    border: '1px solid #00000026',
    '&:hover': {
      backgroundColor: '#fafafa',
      cursor: 'pointer',
    },
  },
});

const HostLobby = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state = {} } = useLocation();
  const { id = '5f1df05b570c76663d85aa81' } = state;

  const [raceData, isLoading, error] = useApiGetResult({ races: [] }, `/raceday/${id}`);
  useEffect(() => {
    if (!isLoading && error) {
      history.replace('/Host');
    }
  });

  const [incomingPlayer] = useWebsocket('/playerlist');
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    if (incomingPlayer.name) {
      setPlayers(p => [...p, incomingPlayer]);
    }
  }, [incomingPlayer]);

  const handleOnJoinClick = () => {
    history.push('/Race');
  };

  const handleOnFinishClick = () => {
    history.push('/Host');
  };

  return (
    <Body>
      <div className={css.pageContainer}>
        { isLoading ? (
          <h1>Loading race data...</h1>
        ) : (
          <>
            <h5>{raceData.name} - {raceData.races.length} RACES - {raceData.currency}{raceData.initialStake} STAKE</h5>
            <h1>Game PIN: {raceData.pin}</h1>
            <div className={css.players}>
              { !players.length ? (
                <h4>Waiting for players</h4>
                ) : (
              <ul>
                { players.mapOrDefault(false,
                  (player, idx) => (
                    <li key={idx}>{<PlayerIdentifier name={player.name} />}</li>
                  ))}
              </ul>
                )}
            </div>
            <div className={css.buttonContainer}>
              <div className={css.finishContainer}>
                <Card className={classes.root} onClick={handleOnFinishClick}>
                  <div>Finish Event</div>
                </Card>
              </div>
              <div className={css.beginContainer}>
                <Card
                  type="submit"
                  className={classes.root}
                  onClick={handleOnJoinClick}
                >
                  <div>Begin First Race</div>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </Body>
  );
};

export default HostLobby;
