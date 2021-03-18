import React from 'react';
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { logout } from '../../state-mgmt/store/login/slice';
import { useHistory } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
    window.location.reload();
  };

  return (
    <div className={styles.root}>
      <AppBar position="static" className={styles.app_bar}>
        <Toolbar className={styles.tool_bar}>
          <Typography variant="h6" className={styles.title}>
            REDUX TODO APP
          </Typography>
          <button onClick={() => handleLogout()} className={styles.button}>
            LOGOUT
          </button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
