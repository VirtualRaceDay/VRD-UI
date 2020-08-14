import React, { useState, useEffect } from 'react';
import css from './Podium.module.css';
import Body from '../Body/Body';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import useApiGetResult from "../../hooks/useLoading";
import { useLocation } from 'react-router-dom';
import { TableFooter } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 80,
    border: '1px solid #00000026'
  },
  head: {
    backgroundColor: '#fafafa',
  },
  table: {
    minWidth: 200,
  },
});

const Podium = () => {
  const { state } = useLocation();
  const { sessionInfo } = state;

  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState({ error: false, messages: [] });

  const raceDayId = () => sessionInfo.lobbyId || sessionInfo.raceDayId;

  const [podiumData, isPodiumDataLoading, podiumDataApiError] = useApiGetResult([], `/podium/${raceDayId()}`);



  useEffect(() => {
    setIsLoading(isPodiumDataLoading);
  }, [isPodiumDataLoading]);

  useEffect(() => {
    const messages = [podiumDataApiError].filter(message => message);
    setApiError({
      error: !!podiumDataApiError,
      messages,
    });
  }, [podiumDataApiError]);

  const classes = useStyles();

  return (
    <Body>
      <div className={css.pageContainer}>
        {isLoading ? (
          <div>Loading.....Please Wait</div>
        ) : apiError.error ? (
          <div>
            <p>There was an error retrieving the data for this race!</p>
            {apiError.messages
              .filter(message => message)
              .map((message, idx) => (
                <p key={idx}>{message}</p>
              ))}
          </div>
        ) : (
              <>
                <h1>And the winner is....</h1>
                <TableContainer component={Paper}>
                  <Table className={classes.table}>
                    <TableHead className={classes.head}>
                      <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>End Balance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {podiumData.map((podiumPlace, key) => (
                        < TableRow key={key}>
                          <TableCell>{podiumPlace.rank}</TableCell>
                          <TableCell>{podiumPlace.player.name}</TableCell>
                          <TableCell>{podiumPlace.player.currentFunds}</TableCell>
                        </TableRow>
                      ))}

                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
      </div>
    </Body >

  );
}

export default Podium;
