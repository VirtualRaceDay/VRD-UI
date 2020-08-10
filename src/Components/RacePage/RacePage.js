import React, { useEffect } from 'react';
import Body from '../Body/Body';
import { useHistory, useLocation } from 'react-router-dom';

import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import css from './RacePage.module.css';
import { putToApi } from "../../utils/apiLayer";
import { useWebsocket } from "../../hooks/useWebsocket";

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

const RacePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state } = useLocation();
  const { sessionInfo } = state;
  const [advanceToRace] = useWebsocket('/eventstate');

  useEffect(() => {
    if (isHost()) return;

    if (advanceToRace === 'finished') {
      history.push('/PlayerLobby', {
        sessionInfo
      });
    }
  }, [advanceToRace, history])

  const handleOnFinishClick = async () => {
    // Go to api to set race as finished
    const response = await putToApi(`/race/${state.race}/finish`);

    if (!response.error) {
      history.push('/HostLobby',
        {
          sessionInfo
        });
    }
  };

  const isHost = () => {
    return state.isHost || false
  }

  return (
    < Body >
      <h3 className={css.pageContainer}>Race in progress</h3>
      <div className={css.buttonContainter}>
        {isHost() ? (
          <Card className={classes.root} onClick={handleOnFinishClick}>
            <div>Finish Race</div>
          </Card>) : ('')}
      </div>
    </Body >
  );
};

export default RacePage;
