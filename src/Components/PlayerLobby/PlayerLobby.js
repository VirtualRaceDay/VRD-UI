import React from 'react';
import Body from '../Body/Body';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import css from './PlayerLobby.module.css';

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

  const handleOnJoinClick = () => {
    history.push('/Race');
  };

  return (
    <Body>
      <div className={css.pageContainer}>
        <h5>CANCER RESEARCH - 3 RACES - R$1000 STAKE</h5>
        <h1>Game PIN: 12345678</h1>
        <div className={css.balance}>Balance: $R1000</div>
        <div className={css.raceCardContainer}>Next Race Card</div>
        <div className={css.buttonContainer}>
          <Card className={classes.root} onClick={handleOnJoinClick}>
            <div>Place Bet</div>
          </Card>
        </div>
      </div>
    </Body>
  );
};

export default PlayerLobby;
