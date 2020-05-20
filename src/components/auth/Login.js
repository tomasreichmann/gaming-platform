import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../firebase/firebase";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  credentialHelper: "none",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]

};

const Login = ({
  ...restProps
}) => {
  return (
    <div {...restProps}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default Login;
