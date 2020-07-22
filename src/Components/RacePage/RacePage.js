import React from 'react';
import Body from '../Body/Body';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import css from './RacePage.module.css';

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

  const handleOnFinishClick = () => {
    history.push('/Leaderboard');
  };

  return (
    <Body>
      <h3 className={css.pageContainer}>Race in progress</h3>
      <div className={css.buttonContainter}>
        <Card className={classes.root} onClick={handleOnFinishClick}>
          <div>Finish Race</div>
        </Card>
      </div>
    </Body>
  );
};

export default RacePage;
