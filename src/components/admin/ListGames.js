import React, { useCallback, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { addGame, getGames, deleteGame, syncGames } from "../../firebase/firestore";
import Loader from "../Loader";
import Link from "../Link";
import ConfirmDialog from "../ConfirmDialog";
import theme from "../../theme";
import SyncLoader from "../SyncLoader";

const useStyles = makeStyles(theme => ({
  root: {},
  new: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  newIcon: {
    color: theme.palette.primary.contrastText,
  },
}));

export default function ListGames(props) {
  const [confirmDeleteGame, setConfirmDeleteGame] = useState(null);
  const classes = useStyles(props);
  const {} = props;

  const addGameAndRedirect = useCallback(() => {
    addGame().then(gameId => {
      Router.push(`/administrace/hra/${gameId}`);
    }); // TODO: handle error
  }, []);

  return (
    <div className={classes.root}>
      <List aria-label="seznam her">
        <SyncLoader task={syncGames}>
          {({ data }) => {
            console.log("data", data);
            return data.map(game => {
              return (
                <ListItem
                  key={game.id}
                  button
                  component={Link}
                  href={`/administrace/hra/${game.id}`}
                >
                  <ListItemText
                    primary={game.name || `Nepojmenovaná hra ${game.id}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => { setConfirmDeleteGame(game) }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            });
          }}
        </SyncLoader>
        <Box textAlign="right">
          <Button variant="contained" onClick={addGameAndRedirect} color="primary">
            <AddIcon className={classes.newIcon} color="inherit" />&emsp;Založit novou hru
          </Button>
        </Box>
        {confirmDeleteGame && (
          <ConfirmDialog
            title={"Smazat hru"}
            confirmText="Smazat"
            onConfirm={() => {
              deleteGame(confirmDeleteGame.id);
              setConfirmDeleteGame(null);
            }}
            onCancel={() => setConfirmDeleteGame(null)}
          >
            Opravdu si přejete naprosto nenávratně smazat hru{" "}
            {confirmDeleteGame.name || confirmDeleteGame.id}?
          </ConfirmDialog>
        )}
      </List>
    </div>
  );
}
