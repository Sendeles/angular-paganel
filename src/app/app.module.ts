import {NgModule} from "@angular/core";
import {SiteLayoutComponent} from "./shared/layout/site-layout/site-layout.component";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AnimateOnViewServices} from "./shared/services/animate.services";
import {LanguageServices} from "./shared/services/language.services";

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CommonModule
  ],
  exports: [

  ],
  providers: [AnimateOnViewServices, LanguageServices],
  bootstrap: [AppComponent]
})
export class AppModule {

}
