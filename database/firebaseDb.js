import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDXts_z81jdPnBThNwrC-rEdwESyg89K_E",
    authDomain: "e-commerce-b1423.firebaseapp.com",
    databaseURL: "https://e-commerce-b1423.firebaseio.com",
    projectId: "e-commerce-b1423",
    storageBucket: "e-commerce-b1423.appspot.com",
    messagingSenderId: "828771404482",
    appId: "1:828771404482:web:4d8d2bd1ef23c009c1095b"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;