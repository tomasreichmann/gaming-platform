import React from "react";
import { useAuth } from "../../firebase/auth";
import { LoaderBody } from "../Loader";
import Login from "./Login";

const AuthRequired = ({ children, loginProps = {} }) => {
  const { isLoading, error, user } = useAuth();

  if (!isLoading && user === null) {
    return <Login {...loginProps} />
  }

  return <LoaderBody state={{
    isLoading, error, data: user
  }}>{({ }) => {
    return children;
  }}</LoaderBody>
};

export default AuthRequired;
