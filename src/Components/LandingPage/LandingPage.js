import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import css from './LandingPage.module.css';
import Body from '../Body/Body';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    border: '1px solid #00000026',
  },
});

const LandingPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleOnHostClick = () => {
    history.push('/Host');
  };

  const handleOnJoinClick = () => {
    history.push('/Join');
  };

  return (
    <Body>
      <div className={css.buttonContainer}>
        <Card className={classes.root} onClick={handleOnHostClick}>
          <div>Host</div>
        </Card>
        <Card className={classes.root} onClick={handleOnJoinClick}>
          <div>Join</div>
        </Card>
      </div>
    </Body>
  );
};

export default LandingPage;
