import { useState, useEffect, useCallback } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { defaultRenderError, LoaderBody } from "./Loader";

const SyncLoader = ({
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

  useEffect(() => {
    return task(data => {
      setState({
        error: null,
        isLoading: false,
        data,
      });
    });
  }, [task]);

  return (
    <LoaderBody
      LoadingComponent={LoadingComponent}
      renderError={renderError}
      loadingProps={loadingProps}
      state={state}
    >
      {children}
    </LoaderBody>
  );
};

export default SyncLoader;
