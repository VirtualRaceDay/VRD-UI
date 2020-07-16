import React, { useState, useEffect } from 'react';
import Body from '../Body/Body';
import { useHistory, useLocation } from 'react-router-dom';
import RaceCard from '../RaceCard/RaceCard';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { makeStyles } from '@material-ui/core/styles';
import css from './HostPage.module.css';
import AddRacecardDialog from '../AddRaceCard/AddRaceCard';

import randomize from 'randomatic';

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
  formControl: {
    minWidth: 160,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 100,
    border: '1px solid #00000026',
    '&:hover': {
      backgroundColor: '#fafafa',
      cursor: 'pointer',
    },
  },
});

function createData(name) {
  return { name };
}

const rows = [
  createData('Cancer Research'),
  createData('St. Patricks Day'),
  createData('Family Fun Night'),
];

const HostPage = () => {
  const classes = useStyles();
  const history = useHistory();
  let props = useLocation().state;

  const [eventName, setEventName] = useState('');
  const [currency, setCurrency] = useState('');
  const [initialStake, setInitialStake] = useState(1000);
  const [maxPlayers, setMaxPlayers] = useState(12);
  const [raceCards, setRaceCards] = useState([]);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    if (props) {
      setModalState(false);
      if (props.newRaceCard === true) {
        setRaceCards([...raceCards, props.raceCard]);
        history.push({
          pathname: '/Host',
          state: {
            newRaceCard: false,
          },
        });
      }
    }
  }, [props, raceCards, history]);

  const handleModalOpen = () => {
    setModalState(true);
  };

  const handleNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleInitialStakeChange = (event) => {
    setInitialStake(event.target.value);
  };

  const handleMaxPlayersChange = (event) => {
    setMaxPlayers(event.target.value);
  };

  const createRaceday = () => {
    const newRaceday = {
      name: eventName,
      currency: currency,
      pin: randomize('A0', 6),
      initialStake: initialStake,
      maxPlayers: maxPlayers,
      players: [],
      races: raceCards,
    };
    return newRaceday;
  };

  const handleOnStartButtonClick = () => {
    const raceday = createRaceday();

    fetch(`http://localhost:3000/racedays/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(raceday),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response) {
          history.push('/HostLobby');
        }
      });
  };

  return (
    <Body>
      <div className={css.pageContainer}>
        <div className={css.pageHeader}>
          <h1>Create Race Day</h1>
        </div>

        <div className={css.pageContent}>
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
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <form
            className={css.createRaceContainer}
            noValidate
            autoComplete="off"
          >
            <TextField
              style={{ width: '100%' }}
              id="standard-basic"
              label="Enter Event Name"
              value={eventName}
              onChange={handleNameChange}
            />
            <div className={css.extraFormContent}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Race Currency
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currency}
                  onChange={handleCurrencyChange}
                >
                  <MenuItem value={'GPB'}>GPB (£) Sterling</MenuItem>
                  <MenuItem value={'USD'}>USD ($) Dollars</MenuItem>
                  <MenuItem value={'RBX'}>RBX (R$) Racing Bux </MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="standard-basic"
                label="Initial Stake"
                value={initialStake}
                onChange={handleInitialStakeChange}
              />
              <TextField
                id="standard-basic"
                label="Max Players"
                value={maxPlayers}
                onChange={handleMaxPlayersChange}
              />
            </div>
            <div className={css.raceCardContainer}>
              <div className={css.emptyRacecard} onClick={handleModalOpen}>
                <RaceCard />
              </div>
              <AddRacecardDialog
                isOpen={modalState}
                raceCardNo={raceCards.length}
              />
              {raceCards.map((race, key) => (
                <div key={key} className={css.raceCard}>
                  <RaceCard raceCard={race} />
                </div>
              ))}
            </div>
            <div className={css.buttonContainer}>
              <Card
                type="submit"
                className={classes.button}
                onClick={handleOnStartButtonClick}
              >
                <div>Start Race Day</div>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </Body>
  );
};

export default HostPage;
