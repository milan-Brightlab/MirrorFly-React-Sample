import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDrRkpCoYgYHrBhOo5RrlmR-Qs0-0vYrVA",
    authDomain: "mirrorfly-demo-app-ad399.firebaseapp.com",
    projectId: "mirrorfly-demo-app-ad399",
    storageBucket: "mirrorfly-demo-app-ad399.appspot.com",
    messagingSenderId: "1004690942780",
    appId: "1:1004690942780:web:af1fa40a5c5d3a26110c39",
    measurementId: "G-TVZJC7NNYD"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
