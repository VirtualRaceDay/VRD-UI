import React, { useState, useEffect } from 'react';
import Body from '../Body/Body';
import { useHistory, useLocation } from 'react-router-dom';

import Card from '@material-ui/core/Card';

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
  const props = useLocation().state;

  const [racedayData, setRacedayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/raceday/${props.pin}`, {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setRacedayData(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [props.pin]);

  const handleOnJoinClick = () => {
    history.push('/Race');
  };

  if (isLoading) {
    return <div>Loading.....Please Wait</div>;
  }

  if (racedayData) {
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
  } else {
    return <div>Nothing to show yet</div>;
  }
};

export default PlayerLobby;
