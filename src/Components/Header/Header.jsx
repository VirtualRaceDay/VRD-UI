import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';

import css from './Header.module.css';

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
                    <button
                        type="button"
                        onClick={handleOnLogoClick}
                    >
                        A day at the races
                    </button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
