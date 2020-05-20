import React from 'react';
import Typography from '@material-ui/core/Typography';
import constants from '../constants';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright &copy; {constants.appName} {new Date().getFullYear()}
    </Typography>
  );
}