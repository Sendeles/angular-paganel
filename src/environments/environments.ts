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

export interface IReview {
  id?: string,
  name: string,
  surname: string,
  expedition: string,
  social: string,
  feedback: string,
  date?: Date | null
}

export interface IFireBaseCreateResponse {
  name: string;
}
