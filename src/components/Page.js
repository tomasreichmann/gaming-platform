import React from 'react';
import Head from 'next/head'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import constants from '../constants';
import Copyright from './Copyright';
import Box from '@material-ui/core/Box';
import PublicNavigation from './Navigation';

const useStyles = makeStyles(theme => ({
  '@global': {
    "html, body": {
      height: "100%",
    },
    "body, #__next": {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      flex: "1 0 auto",
    }
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flex: "1 0 auto",
    // margin: theme.spacing(6, 0, 3),
  },
  body: {
    flex: "1 0 auto",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  footer: {
    backgroundColor: theme.palette.background.default
  },
}));

export default function Page({
  title = constants.appName,
  Navigation = PublicNavigation,
  bodyProps = {},
  children
}) {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navigation />
      <Container maxWidth="sm" className={classes.body} {...bodyProps}>
        {children}
      </Container>
      <Box className={classes.footer} p={2}>
        <Container maxWidth="sm" >
          <Copyright />
        </Container>
      </Box>

    </div>
  );
}
