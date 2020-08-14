import React from 'react';
import css from './Body.module.css';

const Body = ({ children }) => {
  return <main className={css.Body}>{children}</main>;
};

export default Body;
