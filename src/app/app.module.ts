import {NgModule} from "@angular/core";
import {SiteLayoutComponent} from "./shared/layout/site-layout/site-layout.component";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {BrowserModule, HammerModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {AnimateOnViewServices} from "./shared/services/animate.services";
import {LanguageServices} from "./shared/services/language.services";
import {ReviewsComponent} from "./shared/components/reviews/reviews.component";
import {HttpClientModule} from "@angular/common/http";
import {AuthorizationServices} from "./shared/services/authorization.services";
import {FormsModule} from "@angular/forms";
import {AlertsServices} from "./shared/services/alerts.services";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CommonModule,
    HammerModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  exports: [],
  providers: [
    AnimateOnViewServices,
    LanguageServices,
    AuthorizationServices,
    AlertsServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
