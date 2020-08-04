import React from 'react';
import Body from '../Body/Body';
import { useHistory, useLocation } from 'react-router-dom';

import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import css from './Leaderboard.module.css';
import useApiGetResult from "../../hooks/useLoading";
import { currency } from "../../utils/constants";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

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
  const location = useLocation();
  const { state = {} } = location;
  const { raceDayId, isHost } = state;

  const [leaderBoard, isLoading, apiError] = useApiGetResult({ currency: '', players: [] }, `/raceday/${raceDayId}/leaderboard`);

  const handleOnPlayerLobbyClick = () => {
    history.push('/');
  };
  const handleOnHostLobbyClick = () => {
    history.push('/HostLobby');
  };

  const currencyPrefix = currency[leaderBoard.currency];

  return (
    <Body>
      <div className={css.pageContainer}>
        <div className={css.pageHeader}>
          <h1>Leaderboard</h1>
        </div>
        <div className={css.pageContent}>
        { isLoading ? (
          <div>Loading</div>
        ) : apiError ? (
          <div>{apiError}</div>
        ) : (
          <div className={css.leaderboardTable}>
          <TableContainer component={Paper}>
            <Table aria-label='leaderboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Current Wealth</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderBoard.players.map(({_id, name, currentFunds}) => (
                  <TableRow key={_id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{currencyPrefix}{currentFunds}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        )}
        </div>
        <div className={css.buttonContainer}>
          {isHost && (
            <div className={css.finishContainer}>
              <Card className={classes.root} onClick={handleOnHostLobbyClick}>
                <div>Host Lobby</div>
              </Card>
            </div>
          )}
          <div className={css.beginContainer}>
            <Card className={classes.root} onClick={handleOnPlayerLobbyClick}>
              <div>Player Lobby</div>
            </Card>
          </div>
        </div>
      </div>
    </Body>
  );
};

export default Leaderboard;
