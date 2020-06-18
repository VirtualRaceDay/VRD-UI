import React from 'react';
import css from './PlayerIdentifier.module.css';
import image from '../../logo512.png';

const PlayerIdentifier = ({ name }) => {
  return (
    <>
      <div className={css.playerCard}>
        <div className={css.iconContainer}>
          <img className={css.icon} src={image} alt="Player Avatar" />
        </div>
        <div className={css.playerName}>{name}</div>
      </div>
    </>
  );
};

export default PlayerIdentifier;
