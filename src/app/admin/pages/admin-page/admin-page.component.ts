import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AuthorizationServices} from "../../../shared/services/authorization.services";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule //для работы ссылок
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit {


  constructor(
    private router: Router,
    private authService: AuthorizationServices
  ) {
  }

  ngOnInit() {
  }




  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}



// import {Component, OnInit} from '@angular/core';
// import {CommonModule} from "@angular/common";
// import {AuthorizationServices} from "../../../shared/services/authorization.services";
// import {Router} from "@angular/router";
// import { getAuth, signOut } from "firebase/auth";
//
//
// @Component({
//   selector: 'app-admin-page',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './admin-page.component.html',
//   styleUrl: './admin-page.component.scss'
// })
// export class AdminPageComponent implements OnInit {
//
//
//   constructor(
//     private router: Router,
//     private authService: AuthorizationServices
//   ) {
//   }
//
//   ngOnInit() {
//     //setTimeout использую для того что бы уже когда залогиненый повторно попадать на /admin
//     setTimeout(() => {
//       if (this.authService.isAuthenticated()) {
//         console.log('User is authenticated');
//         if (this.authService.isAdmin()) {
//           console.log('User is an admin, granting access to /admin');
//         } else {
//           console.log('User is not an admin, redirecting to /404');
//           this.router.navigate(['/404'], {
//             queryParams: {
//               notAdmin: true
//             }
//           });
//         }
//       } else {
//         console.log('User is not authenticated, redirecting to /404');
//         this.router.navigate(['/404'], {
//           queryParams: {
//             needToLogin: true
//           }
//         });
//       }
//     }, 1000)
//   }
//
//   logout() {
//     const auth = getAuth();
//     signOut(auth).then(() => {
//       // Sign-out successful.
//       this.router.navigate(['/login']);
//     }).catch((error) => {
//       // An error happened.
//     });
//   }
// }
