import 'hammerjs';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {environment} from "./environments/interface";

// const firebaseConfig = {
//   apiKey: "AIzaSyDNvz8KFUSu-GtE3ZDGRbluQV5fM0ndZIo",
//   authDomain: "angular-paganel.firebaseapp.com",
//   databaseURL: "https://angular-paganel-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "angular-paganel",
//   storageBucket: "angular-paganel.appspot.com",
//   messagingSenderId: "685194034186",
//   appId: "1:685194034186:web:ba4e2d4f5f77bbc51133f3",
//   measurementId: "G-SKLQWE2NW1"
// };

firebase.initializeApp(environment.firebaseConfig);

console.log('Проверка объекта firebase.auth:', firebase.auth);

//onAuthStateChanged для отслеживания изменений состояния аутентификации пользователя в Firebase. Когда пользователь аутентифицирован, обработчик выводит его электронную почту в консоль. Когда пользователь выходит из системы, выводится сообщение "User is signed out".
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user.email);
  } else {
    console.log('User is signed out');
  }
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
