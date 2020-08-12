import React, { useEffect, useState } from 'react';
import Body from '../Body/Body';
import { useHistory, useLocation } from 'react-router-dom';
import randomize from 'randomatic';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import PreviousRaceDay from '../PreviousRaceDay/PreviousRaceDay';

import { postToApi, getFromApi } from "../../utils/apiLayer";

import css from './HostPage.module.css';
import AddRacecardDialog from '../AddRaceCard/AddRaceCard';
import RaceCard from '../RaceCard/RaceCard';
import AddRaceCardButton from "./AddRaceCardButton";

const useStyles = makeStyles({
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
    '&:hover, &:focus': {
      backgroundColor: '#fafafa',
      cursor: 'pointer',
    },
  },
});

const HostPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const props = useLocation().state;

  const [raceStarted, setRaceStarted] = useState(false);

  const [eventName, setEventName] = useState('');
  const [currency, setCurrency] = useState('');
  const [initialStake, setInitialStake] = useState(1000);
  const [maxPlayers, setMaxPlayers] = useState(12);
  const [raceCards, setRaceCards] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [raceCardSaved, setRaceCardSaved] = useState(false);
  const [lobbyId, setLobbyId] = useState('');

  useEffect(() => {
    if (!props) return;

    setModalState(false);
    if (!props.newRaceCard) return;

    setRaceCards([...raceCards, props.raceCard]);
    history.push({
      pathname: '/Host',
      state: {
        newRaceCard: false,
      },
    });
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

  const createRaceday = () => ({
    name: eventName,
    currency: currency,
    pin: randomize('A0', 6),
    initialStake: initialStake,
    maxPlayers: maxPlayers,
    players: [],
    races: [],
  });

  const handleOnStartButtonClick = async () => {
    if (lobbyId)
      history.push('/HostLobby', {
        sessionInfo: {
          lobbyId
        }
      });
  };

  const handleSaveRaceDayClick = async () => {
    const raceday = createRaceday();
    const { data } = await postToApi('/racedays', raceday);

    if (data.id) {
      setLobbyId(data.id);
    }

    setRaceCardSaved(true);
  }

  const setRaceDay = (raceDay) =>{
    const raceStarted = (raceDay.races.some((race) => race.state === "started" || race.state === "finished"));
    setRaceStarted(raceStarted);
    
    setEventName(raceDay.name);
    setCurrency(raceDay.currency);
    setInitialStake(raceDay.initialStake);
    setMaxPlayers(raceDay.maxPlayers);
    setRaceCards(raceDay.races);
    setLobbyId(raceDay._id);


    setRaceCardSaved(raceDay._id !== '');
    



  }

  const onPrevRaceClick = (raceId) => {
      if(raceId !== null){
        getFromApi(`/raceday/${raceId}`)
          .then((raceDay) => {
            setRaceDay(raceDay.data);
          })
      } else {
        const raceDay = {
          _id: '',
          name: '',
          currency: '',
          initialStake: 1000,
          maxPlayers: 12,
          races: [],
        };

        setRaceDay(raceDay);
      }     
  };

  return (
    <Body>
      <div className={css.pageContainer}>
        <div className={css.pageHeader}>
          <h1>Create Race Day</h1>
        </div>

        <div className={css.pageContent}>
          <PreviousRaceDay onPrevRaceClick={onPrevRaceClick} />

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
              disabled={raceStarted}
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
                  disabled={raceStarted}
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
                disabled={raceStarted}
              />
              <TextField
                id="standard-basic"
                label="Max Players"
                value={maxPlayers}
                onChange={handleMaxPlayersChange}
                disabled={raceStarted}
              />
            </div>
            {!raceCardSaved ? (<div></div>) : (
              <div className={css.raceCardContainer}>
                {raceStarted ? (<div></div>) : (
                <div className={css.emptyRacecard} onClick={handleModalOpen}>
                  <AddRaceCardButton />
                </div>)
                }
                {raceCards.map((race, key) => (
                  <div key={key} className={css.raceCard}>
                    <RaceCard raceCard={race} />
                  </div>
                ))}
              </div>)}
            <div className={css.buttonContainer}>
              {!raceCardSaved ? (
                <Card
                  type="submit"
                  className={classes.button}
                  onClick={handleSaveRaceDayClick}
                >
                  <div>Create Race Day</div>
                </Card>) : ('')}
              {!raceCardSaved || raceStarted ? ('') : (
                <Card
                  type="submit"
                  className={classes.button}
                  onClick={handleOnStartButtonClick}
                >
                  <div>Start Race Day</div>
                </Card>)}
            </div>
          </form>
        </div>
      </div>
      <AddRacecardDialog
        isOpen={modalState}
        raceDayId={lobbyId} />
    </Body >
  );
};

export default HostPage;
