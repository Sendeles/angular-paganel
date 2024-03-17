import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MyValidators} from "./my.validators";
import {AuthorizationServices} from "../../shared/services/authorization.services";
import {IUser} from "../../shared/models/authorization/authorization.model";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {


  public form: FormGroup;
  private emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  submitted = false
  errorMessage: string = '';
  message: string = ''


  constructor(
    private router: Router,
    public auth: AuthorizationServices,
    private route: ActivatedRoute
  ) {
    this.form = this.getBlankForm()
  }

  //Внутри подписчика проверяется, содержит ли объект params свойство needToLogin. Если это свойство присутствует и истинно, для свойства message компонента устанавливается сообщение на русском языке: "данное поле будет доступно после входа
  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      console.log('this.route', this.route)
      if (params['needToLogin']) {
        this.message = 'данное поле будет доступно после входа'
      } else if (params['authFailed']) {
        this.message = 'Cессия истекла, залогиньтесь снова'
      }
    })
    console.log('this.route', this.route)
  }


  getBlankForm(): FormGroup {
    return new FormGroup<any>({
      email: new FormControl<string>('', [Validators.pattern(this.emailPattern), Validators.required, MyValidators.restrictedEmail]),
      password: new FormControl<string>('', [Validators.minLength(6), Validators.maxLength(12)])
    })
  }

  submit() {
    console.log(this.form)
    const formData = (this.form.value)
    console.log(formData)

    if (this.form.invalid) {
      return
    }
    this.submitted = true

//отправка объекта, и получение результата куда перекидывать в случае успешного захода
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }
    console.log('user', user)
    this.auth.login(user).subscribe({
      next: () => {
        //если неуспешный логин что бы была возможность снова залогиниться без обновления страницы
        this.form.reset();
        this.submitted = false
        if (this.auth.isAdmin()) {
          this.router.navigate(['/admin'])
        }
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
    console.log('user', user)
  }

  extractDomain(email: string | null): string {
    if (email) {
      const atIndex = email.indexOf('@');
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
//   private emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
//   submitted = false
//   errorMessage: string = '';
//   message: string = ''
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
//       console.log('this.route', this.route)
//       if (params['needToLogin']) {
//         this.message = 'данное поле будет доступно после входа'
//       } else if (params['authFailed']) {
//         this.message = 'Cессия истекла, залогиньтесь снова'
//       }
//     })
//     console.log('this.route', this.route)
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
//     // console.log(this.form)
//     const formData = (this.form.value)
//     // console.log(formData)
//
//     if (this.form.invalid) {
//       return
//     }
//     this.submitted = true
//
// //отправка объекта, и получение результата куда перекидывать в случае успешного захода
//     const user: IUser = {
//       email: this.form.value.email,
//       password: this.form.value.password,
//       returnSecureToken: true
//     }
//     // console.log('user', user)
//
//     const auth = getAuth();
//     signInWithEmailAndPassword(auth, this.form.value.email, this.form.value.password)
//       .then((userCredential) => {
//         // Signed in
//         // console.log('userCredential', userCredential);
//         // const user = userCredential.user;
//         if (this.auth.isAdmin()) {
//           this.router.navigate(['/admin'])
//         }
//
//         // this.auth.setCredentials(userCredential.user as User)
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//       });
//
//     // this.auth.login(user).subscribe({
//     //   next: (IAuthResponse) => {
//     //     // console.log('Что приходит', IAuthResponse)
//     //     //если неуспешный логин что бы была возможность снова залогиниться без обновления страницы
//     //
//     //     this.form.reset();
//     //     this.submitted = false
//     //     console.log('this.auth.isAdmin()', this.auth.isAdmin())
//     //     if (this.auth.isAdmin()) {
//     //       this.router.navigate(['/admin'])
//     //     }
//     //   },
//     //   error: (error) => {
//     //     this.errorMessage = error;
//     //   }
//     // });
//     // console.log('user', user)
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
