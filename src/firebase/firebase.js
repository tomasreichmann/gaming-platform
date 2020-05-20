import firebaseConfig from "./config";
const firebase = require("firebase");

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
