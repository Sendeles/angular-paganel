import {FormControl, Validators} from "@angular/forms";

export interface IEnvironments {
  firebaseConfig: {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
  }
}

export interface IPost {
  name: string,
  surname: string,
  expedition: string,
  social: string,
  review: string
}
