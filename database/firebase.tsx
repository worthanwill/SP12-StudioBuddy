import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyBt6aAz1ZrC1Bz4JYCwkdigjSjnidPcdSg",

  authDomain: "studio-buddy-aef32.firebaseapp.com",

  projectId: "studio-buddy-aef32",

  storageBucket: "studio-buddy-aef32.appspot.com",

  messagingSenderId: "955322215434",

  appId: "1:955322215434:web:a6c016104976a2fdc683f3",

  measurementId: "G-SHMLSTZ45K"

};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);