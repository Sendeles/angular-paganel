import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginPageRoutingModule} from "./login-page-routing.module";
import {LoginPageComponent} from "./login-page.component";

const routes: Routes = [
  {
    path: '', component: LoginPageComponent
  } // Для пути /login
];

@NgModule({
  declarations: [
  ],
  imports: [
    LoginPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})

export class LoginPageModule {

}
