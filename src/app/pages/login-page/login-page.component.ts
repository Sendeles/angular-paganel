import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MyValidators} from "./my.validators";
import {AuthorizationServices} from "../../shared/services/authorization.services";
import {IUser} from "../../shared/models/authorization/authorization.model";
import {CommonModule} from "@angular/common";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {


  public form: FormGroup;
  private emailPattern: RegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  submitted: boolean = false
  errorMessage: string = '';
  message: string = ''
  showPassword: boolean = false;


  constructor(
    private router: Router,
    public auth: AuthorizationServices
  ) {
    this.form = this.getBlankForm()
  }

  ngOnInit() {
  }

//создаёт и возвращает объект формы, который определяет структуру и требования к полям, необходимые для успешной верификации данных, введённых пользователем.
  getBlankForm(): FormGroup {
    return new FormGroup<any>({
      email: new FormControl<string>('', [
        //this.emailPattern гарантирует правильный формат адреса электронной почты.
        Validators.pattern(this.emailPattern),
        //Поле обязательно для заполнения
        Validators.required,
        //запрет прописанных доменов
        MyValidators.restrictedEmail
      ]),
      password: new FormControl<string>('', [
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    })
  }

  submit(): void {
    if (this.form.invalid) { //Если форма не валидна
      return //то выходим из метода, return; просто означает, что если форма невалидна, то метод submit() завершается в этой точке, и код, который идет после этого условия, не выполняется.
    }
    this.submitted = true //форма была отправлена

//отправка объекта, и получение результата куда перекидывать в случае успешного захода
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }
    //данная авторизация требуется для того что бы войти в систему firebase, иначе не пускает
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.form.value.email, this.form.value.password)
      .then((userCredential) => { // Обработка успешной аутентификации
        if (this.auth.isAdmin()) {
          this.router.navigate(['/admin'])
        }
      })
    //данный код для авторизации на сайте localhost, просто требуется
    setTimeout(() => {
      this.auth.login(user).subscribe({
        next: (): void => {
          // this.submitted = false
          if (this.auth.isAdmin()) {
            this.router.navigate(['/admin'])
          }
        },
        error: (error): void => {
          this.errorMessage = error;
        }
      });
      //500 это сеттаймаут потому-что почему-то не успеваем получить респонс про то что логин админский до 0.5 секунд
    }, 500)
    console.log('user', user)
  }

  //функция которая меняет показывать или скрывать пароль
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  //функция для отслеживания домена который идет за @
  extractDomain(email: string | null): string {
    if (email) {
      const atIndex: number = email.indexOf('@');
      if (atIndex >= 0) {
        return email.substring(atIndex + 1);
      }
    }
    return '';
  }

  //функция для отслеживания длины пароля или что она делает? чекни плс
  get passwordLength(): number {
    const passwordControl = this.form.get('password');
    if (passwordControl && passwordControl.value) {
      return passwordControl.value.length;
    }
    return 0;
  }
}
