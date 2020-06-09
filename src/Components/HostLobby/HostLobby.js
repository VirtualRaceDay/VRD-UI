import React from 'react';
import Body from '../Body/Body';
import PlayerIdentifier from '../PlayerIdentifier/PlayerIdentifier';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import css from './HostLobby.module.css';

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

const HostLobby = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleOnJoinClick = () => {
    history.push('/Race');
  };

  const randomPlayer = [
    'Dave',
    'Steve',
    'Matt',
    'TJ',
    'Rob',
    'George',
    'Alex',
    'John',
    'Andrew',
    'Brandon',
    'Luke',
  ];

  return (
    <Body>
      <div className={css.pageContainer}>
        <h5>CANCER RESEARCH - 3 RACES - R$1000 STAKE</h5>
        <h1>Game PIN: 12345678</h1>
        <div className={css.players}>
          <ul>
            {randomPlayer &&
              randomPlayer.map((player) => (
                <li key={player}>{<PlayerIdentifier name={player} />}</li>
              ))}
          </ul>
        </div>
        <div className={css.buttonContainer}>
          <Card
            type="submit"
            className={classes.root}
            onClick={handleOnJoinClick}
          >
            <div>Begin Race</div>
          </Card>
        </div>
      </div>
    </Body>
  );
};

export default HostLobby;
