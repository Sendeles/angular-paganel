import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MyValidators} from "./my.validators";
import {AuthorizationServices} from "../../shared/services/authorization.services";
import {IUser} from "../../shared/models/authorization/authorization.model";
import {CommonModule} from "@angular/common";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import firebase from "firebase/compat";
import User = firebase.User;


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


  constructor(
    private router: Router,
    public auth: AuthorizationServices,
    private route: ActivatedRoute
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
    }, 400)
    console.log('user', user)
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

  get passwordLength(): number {
    const passwordControl = this.form.get('password');
    if (passwordControl && passwordControl.value) {
      return passwordControl.value.length;
    }
    return 0;
  }
}



// import {Component, OnInit} from '@angular/core';
// import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
// import {ActivatedRoute, Params, Router} from "@angular/router";
// import {MyValidators} from "./my.validators";
// import {AuthorizationServices} from "../../shared/services/authorization.services";
// import {IUser} from "../../shared/models/authorization/authorization.model";
// import {CommonModule} from "@angular/common";
// import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
// import firebase from "firebase/compat";
// import User = firebase.User;
//
//
// @Component({
//   selector: 'app-login-page',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './login-page.component.html',
//   styleUrl: './login-page.component.scss'
// })
// export class LoginPageComponent implements OnInit {
//
//
//   public form: FormGroup;
//   private emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
//   submitted = false;
//   errorMessage: string = '';
//   message: string = '';
//
//
//   constructor(
//     private router: Router,
//     public auth: AuthorizationServices,
//     private route: ActivatedRoute
//   ) {
//     this.form = this.getBlankForm()
//   }
//
//   //Внутри подписчика проверяется, содержит ли объект params свойство needToLogin. Если это свойство присутствует и истинно, для свойства message компонента устанавливается сообщение на русском языке: "данное поле будет доступно после входа
//   ngOnInit() {
//     this.route.queryParams.subscribe((params: Params) => {
//       if (params['needToLogin']) {
//         this.message = 'данное поле будет доступно после входа'
//       } else if (params['authFailed']) {
//         this.message = 'Cессия истекла, залогиньтесь снова'
//       }
//     })
//   }
//
//
//   getBlankForm(): FormGroup {
//     return new FormGroup<any>({
//       email: new FormControl<string>('', [Validators.pattern(this.emailPattern), Validators.required, MyValidators.restrictedEmail]),
//       password: new FormControl<string>('', [Validators.minLength(6), Validators.maxLength(12)])
//     })
//   }
//
//   submit() {
//     const formData = (this.form.value)
//     if (this.form.invalid) {
//       return
//     }
//     this.submitted = true
//
//     // Signed in
//     const auth = getAuth();
//     signInWithEmailAndPassword(auth, this.form.value.email, this.form.value.password)
//       .then((userCredential) => {
//         if (this.auth.isAdmin()) {
//           this.router.navigate(['/admin'])
//         }
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//       });
//   }
//
//   extractDomain(email: string | null): string {
//     if (email) {
//       const atIndex = email.indexOf('@');
//       if (atIndex >= 0) {
//         return email.substring(atIndex + 1);
//       }
//     }
//     return '';
//   }
//
//   get passwordLength(): number {
//     const passwordControl = this.form.get('password');
//     if (passwordControl && passwordControl.value) {
//       return passwordControl.value.length;
//     }
//     return 0;
//   }
// }
