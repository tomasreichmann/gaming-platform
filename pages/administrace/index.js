import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Page from '../../src/components/Page';
import AdminNavigation from '../../src/components/admin/AdminNavigation';
import ListGames from '../../src/components/admin/ListGames';

export default function Index() {
  return (
    <Page Navigation={AdminNavigation} bodyProps={{maxWidth: "md"}} >
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hry
        </Typography>
        <ListGames />
      </Box>
    </Page>
  );
}
