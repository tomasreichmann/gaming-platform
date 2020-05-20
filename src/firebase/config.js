// @ts-ignore
const apiKey = FIREBASE_API_KEY;

if (!apiKey) {
  console.log('FIREBASE_API_KEY', apiKey);
  throw new Error("missing firebase api key");
}

const firebaseConfig = {
  apiKey,
  authDomain: "go4gold-gaming-platform.firebaseapp.com",
  databaseURL: "https://go4gold-gaming-platform.firebaseio.com",
  projectId: "go4gold-gaming-platform",
  storageBucket: "go4gold-gaming-platform.appspot.com",
  messagingSenderId: "589562654693",
  appId: "1:589562654693:web:f4f86d2247d53835d6c90c",
  measurementId: "G-VNMBHJ00XL"
};


export default firebaseConfig;
