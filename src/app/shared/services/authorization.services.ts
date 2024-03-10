import {Injectable} from "@angular/core";
import {Subject, Observable, tap, throwError, catchError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IAuthResponse, IUser} from "../models/authorization/authorization.model";
import {environment} from "../../../environments/interface";
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationServices {

  //Это Subject, который используется для передачи ошибок аутентификации между компонентами. Мы его пропишем в html, и если пользователь ошибся например в своем пароле, то выскочит ошибка что пароль или емейл введены неверно.
  public error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {}

  //разлогинивается акк если срок действия токена закончился
  get token(): string {
    const expDateStr = localStorage.getItem('fb-token-expired');
    if (expDateStr != null) {
      const expDate = new Date(expDateStr)
      if (new Date() > expDate) {
        this.logout()
        return ''
      }
    }
    const token = localStorage.getItem('fb-token')
    return token !== null ? token : '';
  }

  //k_okami@yahoo.com paganel123
  //отправка данных на бекенд для логинизации
  login(user: IUser): Observable<IAuthResponse> {
    user.returnSecureToken = true; //Этот флаг требуется для того, чтобы сервер вернул безопасный токен доступа после успешной аутентификации пользователя.
    return this.http.post<IAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      )
  }

  //удаление из локал стораджа данных что бы разлогинется
  logout() {
    localStorage.removeItem('fb-token');
    localStorage.removeItem('fb-token-expired');
  }


  // ввод имени пользователя и пароля, которые затем сверяются с хранящимися данными
  isAuthenticated() {
    return !!this.token
  }

//определение является ли залогиненый акк - админским
  isAdmin(): boolean {
    const email = this.getCurrentUserEmail();
    return email === 'k_okami@yahoo';
  }

  getCurrentUserEmail(): string | null {
    console.log('Проверка инициализации Firebase: ', firebase.apps.length ? 'Инициализирован' : 'Не инициализирован');
    console.log('Проверка объекта firebase.auth:', firebase.auth);

    try {
      const user = firebase.auth().currentUser;
      return user ? user.email : null;
    } catch (error) {
      console.error('Ошибка при получении текущего пользователя: ', error);
    }
    return null;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        this.error$.next('Неверный email или пароль')
        break;
    }
    return throwError(() => error)
  }

  private setToken(response: IAuthResponse) {
    console.log(response, 'response')
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-expired', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
