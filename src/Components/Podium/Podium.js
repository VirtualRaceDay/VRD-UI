import React from 'react';
import css from './poduim.module.css';
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

const Podium = () => {
  const { state } = useLocation();
  const { sessionInfo } = state;
  const [podiumData, isPodiumDataLoading, podiumDataApiError] = useApiGetResult([], `${raceDayEndpoint}/podium/${sessionInfo.lobbyId}`);


}
