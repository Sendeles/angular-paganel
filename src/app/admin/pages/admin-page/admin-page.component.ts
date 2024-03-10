import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AuthorizationServices} from "../../../shared/services/authorization.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit {

  showAdminLayout: boolean = false

  constructor(
    private router: Router,
    // private auth: AuthorizationServices
  ) {}

  ngOnInit() {
    // this.showAdminLayout = this.auth.isAdmin();
  }

  // get isAdmin(): boolean {
  //   return this.auth.isAdmin()
  // }

  // logout(event: Event) {
  //   event.preventDefault();
  //   this.auth.logout();
  //   this.router.navigate(['/']);
  // }
}
