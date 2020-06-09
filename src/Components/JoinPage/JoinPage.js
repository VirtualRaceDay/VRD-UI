import React from 'react';
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

  const handleOnJoinClick = () => {
    history.push('/PlayerLobby');
  };

  return (
    <Body>
      <form className={css.pageContainer} noValidate autoComplete="off">
        <div className={css.joinDetailsContainer}>
          <TextField
            style={{ width: '50%' }}
            id="standard-basic"
            label="Enter Game PIN"
          />
          <TextField
            style={{ width: '50%' }}
            id="standard-basic"
            label="Enter Nickname"
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
