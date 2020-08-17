import React, { useState } from 'react';
import Body from '../Body/Body';
import { useHistory } from 'react-router-dom';
import { Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import css from './JoinPage.module.css';
import { postToApi } from "../../utils/apiLayer";

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

const JoinPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [pin, setPin] = useState('');
  const [nickname, setNickname] = useState('');

  const handleOnJoinClick = async () => {
    const response = await postToApi('/player', { pin, nickname });
    if (!response.error) {
      const { data } = response;
      history.push({
        pathname: '/PlayerLobby',
        state: {
          sessionInfo: {
            playerId: data.playerId,
            raceDayId: data.raceDayId,
            nickname: nickname
          }
        },
      });
    } else {
      alert(`There was an error joining the game!\n${response.error}`);
    }
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
