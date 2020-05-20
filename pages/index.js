import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import { useAuth } from '../src/firebase/auth';
import Page from '../src/components/Page';

export default function Index() {
  const auth = useAuth();

  console.log('auth', auth);
  return (
    <Page>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Go4Gold Gamingová platforma
        </Typography>
        Co bude na úvodní stránce?
      </Box>
    </Page>
  );
}
