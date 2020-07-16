import React from 'react';
import Body from '../Body/Body';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import css from './Leaderboard.module.css';

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

const Leaderboard = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleOnPlayerLobbyClick = () => {
    history.push('/');
  };
  const handleOnHostLobbyClick = () => {
    history.push('/HostLobby');
  };

  return (
    <Body>
      <h3 className={css.pageContainer}>Leaderboard</h3>
      <div className={css.buttonContainer}>
        <div className={css.finishContainer}>
          <Card className={classes.root} onClick={handleOnHostLobbyClick}>
            <div>Host Lobby</div>
          </Card>
        </div>
        <div className={css.beginContainer}>
          <Card className={classes.root} onClick={handleOnPlayerLobbyClick}>
            <div>Player Lobby</div>
          </Card>
        </div>
      </div>
    </Body>
  );
};

export default Leaderboard;
