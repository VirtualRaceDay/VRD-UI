import React from 'react';
import Body from '../Body/Body';
import { makeStyles } from '@material-ui/core/styles';
import css from './WagerCard.module.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import RaceCardLine from '../RaceCardLine/RaceCardLine';

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
  },
});

const WagerCard = ({ raceCard }) => {
  const classes = useStyles();

  return (
    <Body>
      <form>
        <div className={css.bettingCard}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell>Horse No.</TableCell>
                  <TableCell>Horse Name</TableCell>
                  <TableCell>Odds</TableCell>
                  <TableCell>Bet</TableCell>
                  <TableCell>Potential Returns</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {raceCard.horses.map((horse, key) => (
                  <RaceCardLine key={key} initialHorse={horse} />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>{raceCard.link}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </form>
    </Body>
  );
};

export default WagerCard; 
