import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  // Remplacez ces valeurs par les informations d'identification Firebase de votre projet
  apiKey: 'AIzaSyBwGXDn2Hjs840YVw8rJmqwTpXZdGPbOBM',
  databaseURL:
    'https://bluedit-81626-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'bluedit-81626',
  storageBucket: 'bluedit-81626.appspot.com',
  appId: '1:11347514483:ios:7e0bf74ee4d61c3de64606',
};

firebase.initializeApp(firebaseConfig);

const db = firestore();

export {db};
