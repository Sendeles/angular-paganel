import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-Paganel';
}


// import {Component, OnInit} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
// // import firebase from "firebase/compat";
// import {AuthorizationServices} from "./shared/services/authorization.services";
// import firebase from "firebase/compat/app";
//
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent implements OnInit {
//   title = 'Angular-Paganel';
//
//   constructor(
//     public auth: AuthorizationServices
//   ) {
//   }
//
//   async ngOnInit(): Promise<void> {
//     //Для работы инициализации в getCurrentUserEmail()
//     // const firebaseConfig = {
//     //   apiKey: "AIzaSyDNvz8KFUSu-GtE3ZDGRbluQV5fM0ndZIo",
//     //   authDomain: "angular-paganel.firebaseapp.com",
//     //   databaseURL: "https://angular-paganel-default-rtdb.europe-west1.firebasedatabase.app",
//     //   projectId: "angular-paganel",
//     //   storageBucket: "angular-paganel.appspot.com",
//     //   messagingSenderId: "685194034186",
//     //   appId: "1:685194034186:web:ba4e2d4f5f77bbc51133f3",
//     //   measurementId: "G-SKLQWE2NW1"
//     // };
//     //
//     // await firebase.initializeApp(firebaseConfig);
//     // this.checkCredentials();
//   }
//
//   checkCredentials(): void {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.auth.setCredentials(user)
//         console.log('User is signed in:', user.email);
//       } else {
//         console.log('User is signed out');
//       }
//     });
//   }
// }
