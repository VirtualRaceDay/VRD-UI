import React from 'react';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

import useApiGetResult from '../../hooks/useLoading';
import css from './HostPagePreviousRaces.module.css';

const useStyles = makeStyles({
    table: {
        minWidth: 200,
    },
});

const PreviousRaces = () => {
    const classes = useStyles();
    const [previousRaces, loadingPreviousRaces] = useApiGetResult([], '/racedays');

    return (
        <div className={css.previousRaceContainer}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="Previous race days">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{ backgroundColor: '#77dd77', color: '#ffffff' }}
                            >
                                Previous Race Days
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loadingPreviousRaces
                            ? (
                                <TableRow>
                                    <TableCell component="td" scope="row">
                                        Loading Races...
                                    </TableCell>
                                </TableRow>
                            )
                            : (previousRaces.mapOrDefault(
                                (
                                    <TableRow key="default">
                                        <TableCell component="td" scope="row">
                                            No previous races
                                        </TableCell>
                                    </TableRow>
                                ),
                                (race) => (
                                    <TableRow key={race._id}>
                                        <TableCell component="td" scope="row">
                                            Race name: <strong>{race.name}</strong><br />
                                            PIN: {race.pin}<br />
                                            Created {moment(race.date).format('DD-MM-YYYY')}
                                        </TableCell>
                                    </TableRow>
                                )
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PreviousRaces;
