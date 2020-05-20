import React from 'react';

import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Page from '../../../src/components/Page';
import AdminNavigation from '../../../src/components/admin/AdminNavigation';
import EditGame from '../../../src/components/admin/EditGame';

export default function Index() {
  const router = useRouter();
  const { gameId } = router.query;

  return (
    <Page Navigation={AdminNavigation} bodyProps={{maxWidth: "md"}} >
      <EditGame gameId={gameId}/>
    </Page>
  );
}
