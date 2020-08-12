import React from 'react';
import moment from 'moment';

import useApiGetResult from "../../hooks/useLoading";
import css from './PreviousRaceDay.module.css';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 200,
    },
  });

const PreviousRaceDay = (props) => {

    const classes = useStyles();

    const [previousRaces, loadingPreviousRaces] = useApiGetResult([], '/racedays');

    return (
        <div className={css.previousRaceContainer}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ backgroundColor: '#77DD77', color: '#ffffff' }}
                    >
                      Previous Race Days
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingPreviousRaces ? (
                    <TableRow>
                      <TableCell component="td" scope="row">
                        Loading Races...
                      </TableCell>
                    </TableRow>
                  ) : (
                      previousRaces.mapOrDefault(
                        (<TableRow key="default">
                          <TableCell component="td" scope="row">
                            No previous races
                        </TableCell>
                        </TableRow>),
                        (race) => (
                          <TableRow key={race._id}>
                            <TableCell component="td" scope="row" className={css.previousRaceItem} onClick={() => props.onPrevRaceClick(race._id)}>
                              {race.name} - {moment(race.date).format('DD-MM-YYYY')}
                            </TableCell>
                          </TableRow>
                        )))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
    );
};

export default PreviousRaceDay;