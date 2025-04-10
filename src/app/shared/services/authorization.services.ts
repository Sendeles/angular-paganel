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

  // Установка токена после успешной аутентификации.
  private setToken(response: IAuthResponse): void {
      console.log(response, 'response')
      if (response) {
        const expDate: Date = new Date(new Date().getTime() + +response.expiresIn * 1000) //В этой строке создается объект Date, который представляет дату истечения срока действия токена. Для этого берется текущее время (new Date().getTime()) и прибавляется значение expiresIn, полученное из объекта response. Значение expiresIn представляет собой количество секунд, на которое действителен токен. Умножение на 1000 преобразует секунды в миллисекунды.
        localStorage.setItem('fb-token', response.idToken) // Эта строка сохраняет токен аутентификации (idToken) в локальное хранилище браузера под ключом 'fb-token'. Токен используется для аутентификации пользователя при последующих запросах к серверу.
        localStorage.setItem('fb-token-expired', expDate.toString()) //Эта строка сохраняет дату истечения срока действия токена (expDate) в локальное хранилище браузера под ключом 'fb-token-expired'. Для этого дата преобразуется в строку с помощью метода toString().
      } else {
        localStorage.clear() // В этой строке вызывается метод clear() для локального хранилища. Это удалит все данные из локального хранилища, если объект response не существует или пуст.
      }
  }

  //разлогинивается акк если срок действия токена закончился
  get token(): string {
      const expDateStr: string | null = localStorage.getItem('fb-token-expired');  // Получение строки с датой истечения срока действия токена из локального хранилища.
      if (expDateStr != null) {   // Проверка, если строка с датой не пуста.
        const expDate: Date = new Date(expDateStr)    // Преобразование строки с датой в объект Date.
        if (new Date() > expDate) {     // Проверка, если текущая дата больше даты истечения срока действия токена.
          this.logout() //Если срок действия токена истек, то вызывает метод logout() для разлогинивания пользователя и возвращает пустую строку
          return ''
        }
    }
    const token: string | null = localStorage.getItem('fb-token') //Если срок действия токена не истек, то он продолжит и вернет сам токен из локального хранилища
    return token !== null ? token : '';
  }

  //отправка данных на бекенд для логинизации
  login(user: IUser): Observable<IAuthResponse> {
    user.returnSecureToken = true; //Этот флаг требуется для того, чтобы сервер вернул безопасный токен доступа после успешной аутентификации пользователя.
    return this.http.post<IAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`, user)
      .pipe( //pipe объединяет обработку успешного ответа и обработку ошибок в одном месте, делая код более читаемым и поддерживаемым. Если бы был один оператор (tap или catchError) то pipe не нужен бы был
        tap(this.setToken), // Вызов метода setToken для установки токена в локальное хранилище.
        tap((response: IAuthResponse) => this.setIsAdmin(this.isAdmin())), // Сохраняем информацию о том, является ли пользователь администратором
        catchError((error: HttpErrorResponse) => this.handleError(error)) //Если при выполнении запроса возникает ошибка, без обработки эта ошибка может привести к непредсказуемому поведению вашего приложения + в нашем случае мы еще уведомляем пользователя о том чтовход неуспешный об этом ниже
      )
  }

  //удаление из локал стораджа данных что бы разлогинется
  logout(): void {
      localStorage.removeItem('fb-token');
      localStorage.removeItem('fb-token-expired');
      localStorage.removeItem('isAdmin');
  }


  // ввод имени пользователя и пароля, которые затем сверяются с хранящимися данными
  isAuthenticated() {
    return !!this.token
  }

  //получение пользователя из базы firebase
  getCurrentUserEmail(): string | null {
    console.log('Проверка инициализации Firebase: ', firebase.apps.length ? 'Инициализирован' : 'Не инициализирован');
    console.log('Проверка объекта firebase.auth:', firebase.auth);
    console.log(firebase.auth() !== null)

    try {
      const user: firebase.User | null = firebase.auth().currentUser;    // Попытка получить текущего пользователя.
      console.log('Текущий пользователь FireBase', user)
      if (user) {
        console.log('Email текущего пользователя', user.email)
        return user.email
      } else {
        console.log('Текущий пользователь не найден')
        return null
      }
      // return user ? user.email : null; // Если пользователь существует, возвращаем его email, иначе возвращаем null.
    } catch (error) {
      console.error('Ошибка при получении текущего пользователя: ', error);
    }
    return null;
  }

//определение является ли залогиненый акк - админским
  isAdmin(): boolean {
    const email: string | null = this.getCurrentUserEmail();
    return email === 'k_okami@yahoo.com';
  }

  //Новый метод, который будет сохранять информацию в localStorage о том, является ли пользователь администратором, Эта проблема возникает, что при обновлении страницы состояние аутентификации пользователя теряется, и сервис AuthGuard больше не может определить, является ли текущий пользователь администратором.
  setIsAdmin(isAdmin: boolean): void {
      //Ошибка ReferenceError: localStorage is not defined возникает из-за того, что объект localStorage доступен только в браузерной среде, но не в Node.js. Исправляем эту ошибку, используем условную проверку существования объекта window и его свойства localStorage
      localStorage.setItem('isAdmin', isAdmin.toString());
  }

  private handleError(error: HttpErrorResponse): Observable<never> { //Внутри метода handleError мы получаем объект HttpErrorResponse, который есть родным, который содержит информацию об ошибке. Объект error, о котором идет речь в методе handleError, является встроенным объектом, предоставляемым Angular в виде экземпляра класса HttpErrorResponse. поэтому мы не можем ему задать имя которое хотим
    const {message} = error.error.error //{ message }: Это деструктуризация объекта, которая извлекает значение свойства message из объекта error.error. Это эквивалентно записи const message = error.error.error.message именно к тому который НЕ в массиве

    console.log('message', message) //для определения ошибки
    console.log('error', error)
    console.log('HttpErrorResponse', HttpErrorResponse)

    switch (message) {
      case 'INVALID_LOGIN_CREDENTIALS': // нахожу Common error codes здесь https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
        this.error$.next('Неверный email или пароль')
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Незарегестрированный email')
        break;
    }
    return throwError(() => error) //throwError(() => error) создает Observable, который немедленно выбрасывает ошибку, используя объект ошибки, который был передан в метод handleError. Этот Observable будет передавать эту ошибку всем подписчикам на него. Обычно этот Observable используется для обработки ошибок в цепочке операторов Observable, например, в методе catchError.
  }
}

