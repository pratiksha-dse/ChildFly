import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDe0izWVPytpq8OSkjHbmEGmp7b2XuvLm8",
  authDomain: "capibull-a9a71.firebaseapp.com",
  projectId: "capibull-a9a71",
  storageBucket: "capibull-a9a71.appspot.com",
  messagingSenderId: "562919424463",
  appId: "1:562919424463:web:ae6c77d2e2d8e3d47dd2ba",
  measurementId: "G-DM1HD9BY8K"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase
