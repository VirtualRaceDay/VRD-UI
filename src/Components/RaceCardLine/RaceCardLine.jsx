import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField'

const RaceCardLine = ({ initialHorse, callback }) => {
  const [horse, setHorse] = useState(initialHorse);
  const [returns, setReturns] = useState('');

  const onChangeHandler = (event) => {
    horse.bet = event.target.value;

    horse.potentialReturns = (parseFloat(horse.bet) * parseFloat(horse.odds)) + parseFloat(horse.bet);

    setReturns(horse.potentialReturns);
    setHorse(horse);

    return callback();
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {horse.number}
      </TableCell>
      <TableCell>{horse.name}</TableCell>
      <TableCell>{horse.odds}</TableCell>
      <TableCell>
        <TextField
          id="bet-amount"
          type="number"
          variant="filled"
          onChange={onChangeHandler}
          InputLabelProps={{
            shrink: true,
          }}

        />
      </TableCell>
      <TableCell>
        <div>
          <span>{returns || ''}</span>
        </div>
      </TableCell>
    </TableRow>
  )
}


export default RaceCardLine;
