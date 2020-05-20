import { useState, useEffect, useCallback } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


import noop from "lodash/noop";
import { Typography } from "@material-ui/core";

export const defaultRenderError = (error, retry) => {
  <Paper key="error" >
    <Typography variant="caption">Došlo k chybě:</Typography>
    <pre>{JSON.stringify(error, null, 2)}</pre>
    <Button onClick={() => retry()} >Zkusit znovu?</Button>
  </Paper>;
};

export const InlineLoader = ({ ...restProps }) => (
  <CircularProgress {...restProps} />
);

export const LoaderBody = ({
  state,
  retry = noop,
  children,
  LoadingComponent = CircularProgress,
  renderError = defaultRenderError,
  loadingProps = {}
}) => {
  return <>
      {state.isLoading && <LoadingComponent key="loading" {...loadingProps} />}
      {state.error && renderError(state.error, retry)}
      {state.data &&
        children({
          data: state.data,
          retry
        })}
    </>
}

const Loader = ({
  children,
  task,
  initialIsLoading = true,
  LoadingComponent = CircularProgress,
  renderError = defaultRenderError,
  loadingProps = {}
}) => {
  const [state, setState] = useState({
    isLoading: initialIsLoading,
    error: null,
    data: null
  });

  const makeRequest = useCallback(() => {
    setState({ isLoading: true, data: null, error: null });
    task()
      .then(data => {
        setState({ isLoading: false, data, error: null });
      })
      .catch(error => {
        setState({ isLoading: false, data: null, error });
      });
  }, [task, state]);

  useEffect(() => {
    makeRequest();
  }, [task]);

  return (
    <LoaderBody
      LoadingComponent={LoadingComponent}
      renderError={renderError}
      loadingProps={loadingProps}
      state={state}
      retry={makeRequest}
    >
      {children}
    </LoaderBody>
  );
};

export default Loader;
