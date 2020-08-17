import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

import {
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Checkbox
} from '@material-ui/core';

import { postToApi } from "../../utils/apiLayer";
import css from './AddRaceCard.module.css';

const useStyles = makeStyles({
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

const AddRacecardDialog = ({ isOpen, raceDayId }) => {
    const classes = useStyles();
    const history = useHistory();

    const [modalState, setModalState] = useState(isOpen);
    const [horses, setHorses] = useState([]);
    const [rowNumber, setRowNumber] = useState(horses.length);
    const [currentHorse, setCurrentHorse] = useState({});
    const [raceName, setRaceName] = useState('');
    const [link, setLink] = useState('');
    const [horseNumber, setHorseNumber] = useState(0);
    const [horseName, setHorseName] = useState('');
    const [horseOdds, setHorseOdds] = useState(0);
    const [isWinner, setisWinner] = useState(false);

    useEffect(() => {
        setModalState(isOpen);

        if (currentHorse.name) {
            setHorses([...horses, currentHorse]);
            setCurrentHorse({});
            setHorseName('');
            setHorseNumber(0);
            setHorseOdds(0);
            setisWinner(false);
        }
    }, [isOpen, currentHorse, horses, modalState]);

    const handleRaceNameChange = (event) => {
        setRaceName(event.target.value);
    };

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const handleHorseNameChange = (event) => {
        setHorseName(event.target.value);
    };

    const handleHorseNumberChange = (event) => {
        setHorseNumber(event.target.value);
    };

    const handleHorseOddsChange = (event) => {
        setHorseOdds(event.target.value);
    };

    const handleHorseWinnerChange = (event) => {
        setisWinner(event.target.checked);
    };

    const clearForm = () => {
        setCurrentHorse({});
        setHorseName('');
        setHorseNumber(0);
        setHorseOdds(0);
        setisWinner(false);
        setHorses([]);
        setLink('');
        setRaceName('');
        setRowNumber(horses.length);
    };

    const handleAddClick = () => {
        const createHorse = {
            id: rowNumber + 1,
            name: horseName,
            number: horseNumber,
            odds: horseOdds,
            winner: isWinner,
        };

        setRowNumber(rowNumber + 1);
        setCurrentHorse(createHorse);
    };

    const handleModalClose = () => {
        setModalState(false);

        history.push({
            pathname: '/Host',
            state: {
                modalState: false,
            },
        });
    };

    const handleModalSubmit = async () => {
        handleAddClick();

        const race = {
            name: raceName,
            link,
            horses: horses,
        };

        const input = {
            race,
            raceDayId
        }

        const { data } = await postToApi('/race', input);

        setModalState(false);

        history.push({
            pathname: '/Host',
            state: {
                modalState: false,
                newRaceCard: true,
                raceCard: {
                    name: raceName,
                    link: link,
                    horses: horses,
                },
            },
        });

        clearForm();
    };

    return (
        <Dialog open={modalState} onClose={handleModalClose}>
            <form noValidate autoComplete="off">
                <DialogTitle id="form-dialog-title">
                    Create Race Card
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        To create a race card for your event, please enter at least 2 horses to compete and please select ONLY 1 WINNER!.
                    </DialogContentText>

                    <div className={css.formContent}>
                        <TextField
                            autoFocus
                            id="raceName"
                            label="Race Name"
                            type="text"
                            value={raceName}
                            onChange={handleRaceNameChange}
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            id="link"
                            label="Url link"
                            type="url"
                            value={link}
                            onChange={handleLinkChange}
                            fullWidth
                        />
                    </div>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
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

                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <TextField
                                            autoFocus
                                            id="number"
                                            label="Horse No."
                                            type="number"
                                            value={horseNumber}
                                            onChange={handleHorseNumberChange}
                                        />
                                    </TableCell>

                                    <TableCell align="center">
                                        <TextField
                                            autoFocus
                                            id="name"
                                            label="Horse Name"
                                            type="text"
                                            value={horseName}
                                            onChange={handleHorseNameChange}
                                        />
                                    </TableCell>

                                    <TableCell align="center">
                                        <TextField
                                            autoFocus
                                            id="odds"
                                            label="Odds"
                                            type="number"
                                            value={horseOdds}
                                            onChange={handleHorseOddsChange}
                                        />
                                    </TableCell>

                                    <TableCell align="center">
                                        <Checkbox
                                            checked={isWinner}
                                            onChange={handleHorseWinnerChange}
                                            name="winner"
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className={css.addRow}>
                        <div className={css.button} onClick={handleAddClick}>
                            <AddCircleIcon onClick={handleAddClick} />
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="primary"
                        onClick={handleModalClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="primary"
                        onClick={handleModalSubmit}
                        disabled={rowNumber < 2}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddRacecardDialog;
