import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from "react";
import firebase from "./firebase";

const initialState = { isLoading: true, error: null, user: null };

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState(initialState);

  useEffect(() => {
    setUserState({ isLoading: true, error: null, user: null });
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(
        user => {
          setUserState({ isLoading: false, error: null, user })
        },
        error => {
          console.error('onAuthStateChanged error', error);
          setUserState({ isLoading: false, error, user: null })
        },
      );
    return unregisterAuthObserver;
  }, []);

  const logout = useCallback(() => {
    setUserState({
      isLoading: true,
      error: null,
      user: userState.user
    });
    firebase.auth().signOut().then(
      () => {
        setUserState({ isLoading: false, error: null, user: null });
      },
      error => {
        setUserState({ isLoading: false, error, user: userState.user });
      }
    );
  }, [userState.user]);

  return (
    <AuthContext.Provider value={{ ...userState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
