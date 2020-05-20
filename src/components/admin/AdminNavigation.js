import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import constants from '../../constants';
import Link from '../Link';

const useStyles = makeStyles(theme => ({
  root: {

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AdminNavigation(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link href="/administrace" color="inherit">
            <Typography variant="h6" className={classes.title}>
              {constants.appShortName} Administrace
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}