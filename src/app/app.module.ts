import {NgModule} from "@angular/core";
import {SiteLayoutComponent} from "./shared/layout/site-layout/site-layout.component";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {BrowserModule, HammerModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {AnimateOnViewServices} from "./shared/services/animate.services";
import {LanguageServices} from "./shared/services/language.services";
import {RouterModule} from "@angular/router";
import {ReviewsComponent} from "./shared/components/reviews/reviews.component";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    SharedModule,
    CommonModule,
    HammerModule,
    AppComponent,
    SiteLayoutComponent,
    ReviewsComponent
  ],
  exports: [],
  providers: [
    AnimateOnViewServices,
    LanguageServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
