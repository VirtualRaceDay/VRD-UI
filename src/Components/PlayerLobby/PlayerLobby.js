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
    history.push('/Lobby');
  };

  return (
    <Body>
      <div className={css.pageContainer}>Hi</div>
    </Body>
  );
};

export default PlayerLobby;
