import React from 'react';
import css from './Header.module.css';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Header = () => {
  const history = useHistory();

  const handleOnLogoClick = () => {
    history.push('/');
  };

  return (
    <div className={css.header}>
      <AppBar
        position="static"
        style={{ background: '#77DD77', color: '#ffffff' }}
      >
        <Toolbar>
          <h3 onClick={handleOnLogoClick}>Logo</h3>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
