import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { setGame as setGameDB, syncGame } from "../../firebase/firestore";
import isEqual from "lodash/isEqual";
import { Typography, Box } from "@material-ui/core";
import MarkdownEditor from "../Markdown/MarkdownEditor";
import { markdownValueGetter } from "../Markdown/Markdown";

const useStyles = makeStyles(theme => ({
  root: {},
  name: {
    fontSize: theme.typography.h4.fontSize
  },
  newIcon: {
    color: theme.palette.primary.contrastText
  },
  form: {
    display: "grid",
    gridGap: theme.spacing(2),
  },
  markdownEditorLabel: {
    marginBottom: theme.spacing(2),
  }
}));

export default function EditGame(props) {
  const classes = useStyles(props);
  const [savedGame, setSavedGame] = useState(null);
  const [game, setGame] = useState(null);
  const { gameId } = props;

  const {
    name = `Nepojmenovaná hra ${gameId}`,
    status = "hidden",
    answerTimeout = 5000,
    introContent = "",
    inviteContent = "",
    winnerContent = "",
    looserContent = "",
  } = game || {};

  const isSaved = isEqual(savedGame, game);

  useEffect(() => {
    let mounted = true;
    if (gameId) {
      syncGame(gameId, data => {
        if (mounted) {
          setSavedGame(data);
        }
      });
      return () => {
        mounted = false;
      };
    }
  }, [gameId]);

  useEffect(() => {
    let mounted = true;
    if (savedGame && game === null && mounted) {
      setGame(savedGame);
      return () => {
        mounted = false;
      };
    }
  }, [savedGame, game]);

  const getOnChange = (
    prop,
    valueGetter = param => param.target.value
  ) => param => {
    const value = valueGetter(param);
    setGame(state => {
      return {
        ...state,
        [prop]: value
      };
    });
  };

  return (
    <div className={classes.root}>
      {game === null && <CircularProgress />}
      {game !== null && (
        <Box className={classes.form}>
          <div>
            <Button disabled={isSaved} onClick={() => setGame(savedGame)}>
              Vrátit změny
            </Button>
            <Button
              disabled={isSaved}
              variant="contained"
              color="primary"
              onClick={() => setGameDB(game)}
            >
              Uložit
            </Button>
          </div>
          <FormControl margin="normal">
            <TextField
              required
              id="name"
              label="Jméno"
              value={name}
              onChange={getOnChange("name")}
              className={classes.name}
            />
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Stav</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="state"
              value={status}
              onChange={getOnChange("status")}
              row
            >
              <FormControlLabel
                value="hidden"
                control={<Radio />}
                label="Skrytá"
              />
              <FormControlLabel
                value="published"
                control={<Radio />}
                label="Publikovaná"
              />
              <FormControlLabel
                value="running"
                control={<Radio />}
                label="Běžící"
              />
              <FormControlLabel
                value="finished"
                control={<Radio />}
                label="Ukončená"
              />
            </RadioGroup>
          </FormControl>
          <FormControl margin="normal">
            <TextField
              required
              id="answerTimeout"
              label="Čas na zodpovězení otázky"
              type="number"
              value={answerTimeout}
              onChange={getOnChange("answerTimeout")}
              InputProps={{
                endAdornment: <InputAdornment position="end">ms</InputAdornment>
              }}
            />
          </FormControl>
          <FormControl margin="normal">
            <FormLabel component="legend" className={classes.markdownEditorLabel}>Úvodní obsah</FormLabel>
            <MarkdownEditor
              value={introContent}
              onChange={getOnChange("introContent", markdownValueGetter)}
            />
          </FormControl>
          <FormControl margin="normal">
            <FormLabel component="legend" className={classes.markdownEditorLabel}>Obsah pozvánky</FormLabel>
            <MarkdownEditor
              value={inviteContent}
              onChange={getOnChange("inviteContent", markdownValueGetter)}
            />
          </FormControl>
          <FormControl margin="normal">
            <FormLabel component="legend" className={classes.markdownEditorLabel}>Obsah pro vítěze</FormLabel>
            <MarkdownEditor
              value={winnerContent}
              onChange={getOnChange("winnerContent", markdownValueGetter)}
            />
          </FormControl>
          <FormControl margin="normal">
            <FormLabel component="legend" className={classes.markdownEditorLabel}>Obsah pro nevýherce</FormLabel>
            <MarkdownEditor
              value={looserContent}
              onChange={getOnChange("looserContent", markdownValueGetter)}
            />
          </FormControl>
          status: hidden | published | running | finished
          Stav soutěže

          currentQuestion: null | number
          Číslo aktuálně zobrazené otázky

          currentAnswerDeadline: Date
          Čas do kdy musí hráč na aktuální otázku odpovědět

          answerTimeout: number
          počet ms, kterou mají hráči na zodpovězení otázky
          introContent
          Úvodní obsah
          inviteContent
          Obsah pozvánky
          winnerContent
          Obsah pro vítěze
          looserContent
          Obsah pro nevýherce
          questions
          questionContent
          Text otázky
          options
          optionText
          Text odpovědi
          correctOptionIndex
          číslo správné odpovědi

        </Box>
      )}
    </div>
  );
}
