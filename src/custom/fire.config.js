import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyD2OhLjrT8U__kNclKovrJwj2KG_jLjEHc",
  authDomain: "fir-react-bc18f.firebaseapp.com",
  databaseURL: "https://fir-react-bc18f.firebaseio.com",
  projectId: "fir-react-bc18f",
  storageBucket: "fir-react-bc18f.appspot.com",
  messagingSenderId: "734870530752",
  appId: "1:734870530752:web:61c54c759530d8a097db25",
  measurementId: "G-33V4QF061L",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
