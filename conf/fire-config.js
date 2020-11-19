// config/fire-config.js
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCYzc8fndOsY2IfjKP9x1q8iuysB-RY6lk",
    authDomain: "blogthanhle.firebaseapp.com",
    databaseURL: "https://blogthanhle.firebaseio.com",
    projectId: "blogthanhle",
    storageBucket: "blogthanhle.appspot.com",
    messagingSenderId: "966791598779",
    appId: "1:966791598779:web:186d18f495e65a4b584f9e"
};
try {
    firebase.initializeApp(firebaseConfig);
} catch(err){
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)}
}
const fireDb = firebase;
export default fireDb;