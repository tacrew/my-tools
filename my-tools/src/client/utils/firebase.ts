import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";

const config = {
    apiKey: "AIzaSyD-RL2kcUGs2NYzbI8ZPS6tAZvLNpuJuNs",
    authDomain: "buyma-tools.firebaseapp.com",
    databaseURL: "https://buyma-tools.firebaseio.com",
    projectId: "buyma-tools",
    storageBucket: "buyma-tools.appspot.com",
    messagingSenderId: "348415188540",
    appId: "1:348415188540:web:3e662377898daad796ed39"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const db = firebase.firestore();
export const functions = firebase.app().functions("asia-northeast1");
