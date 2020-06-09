import React from 'react';
import css from './PlayerIdentifier.module.css';
import image from '../../logo512.png';

const PlayerIdentifier = ({ name, icon }) => {
  return (
    <>
      <div className={css.playerCard}>
        <div className={css.iconContainer}>
          <img className={css.icon} src={image}></img>
        </div>
        <div className={css.playerName}>{name}</div>
      </div>
    </>
  );
};

export default PlayerIdentifier;
