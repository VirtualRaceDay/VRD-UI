import React from 'react';
import css from './RaceCard.module.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';

import AddCircleIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import { TableFooter } from '@material-ui/core';

const useStyles = makeStyles({
  head: {
    backgroundColor: '#fafafa',
  },
  table: {
    minWidth: 200,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 100,
    border: '1px solid #00000026',
  },
});

const RaceCard = ({ raceCard }) => {
  const classes = useStyles();

  if (raceCard) {
    const horses = raceCard.horses;

    return (
      <div className={css.raceCard}>
        <div>{raceCard.name}</div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell>Horse No.</TableCell>
                <TableCell>Horse Name</TableCell>
                <TableCell>Odds</TableCell>
                <TableCell>Winner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {horses.map((horse, key) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    {horse.number}
                  </TableCell>
                  <TableCell>{horse.name}</TableCell>
                  <TableCell>{horse.odds}</TableCell>
                  <TableCell align="center">
                    <Checkbox checked={horse.winner} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>{raceCard.link}</TableFooter>
        </TableContainer>
      </div>
    );
  } else {
    return (
      <div className={css.emptyRacecard}>
        <AddCircleIcon fontSize="large" />
        Add Race Card
      </div>
    );
  }
};

export default RaceCard;
