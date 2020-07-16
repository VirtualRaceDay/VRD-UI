import React, { useState } from 'react';
import Body from '../Body/Body';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import css from './JoinPage.module.css';

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

const JoinPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [pin, setPin] = useState('');
  const [nickname, setNickname] = useState('');

  const handleOnJoinClick = () => {
    console.log(pin, nickname);
    history.push({
      pathname: '/PlayerLobby',
      state: { pin: pin, nickname: nickname },
    });
  };

  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  return (
    <Body>
      <form className={css.pageContainer} noValidate autoComplete="off">
        <div className={css.joinDetailsContainer}>
          <TextField
            style={{ width: '50%' }}
            id="standard-basic"
            label="Enter Game PIN"
            value={pin}
            onChange={handlePinChange}
          />
          <TextField
            style={{ width: '50%' }}
            id="standard-basic"
            label="Enter Nickname"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <div className={css.joinButtonContainer}>
          <Card
            type="submit"
            className={classes.root}
            onClick={handleOnJoinClick}
          >
            <div>Join</div>
          </Card>
        </div>
      </form>
    </Body>
  );
};

export default JoinPage;
