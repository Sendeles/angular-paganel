import {NgModule} from "@angular/core";
import {SiteLayoutComponent} from "./shared/layout/site-layout/site-layout.component";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {RouterModule, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app.routes";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";

library.add(faYoutube)

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
