import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';

import useApiGetResult from '../../hooks/useLoading';
import css from './HostPagePreviousRaces.module.css';

const useStyles = makeStyles({
    table: {
        minWidth: 200,
    },
});

const PreviousRaces = (props) => {
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

                    <TableRow>
                        <TableCell component="td" scope="row" className={css.previousRaceItem} onClick={() => props.onPrevRaceClick(null)}>
                          <AddCircleIcon className={css.addRaceItem} />
                        </TableCell>
                    </TableRow>

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
                                        <TableCell className={css.previousRaceItem} component="td" scope="row" onClick={() => props.onPrevRaceClick(race._id)}>
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
