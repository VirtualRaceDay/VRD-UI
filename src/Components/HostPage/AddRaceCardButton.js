import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

import css from './AddRaceCardButton.module.css'

const AddRaceCardButton = () => (
  <div className={css.emptyRacecard}>
    <AddCircleIcon fontSize="large" />
    Add Race Card
  </div>
);

export default AddRaceCardButton;
