import {Injectable, NgModule} from "@angular/core";
import {SiteLayoutComponent} from "./shared/layout/site-layout/site-layout.component";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {
  BrowserModule,
  EVENT_MANAGER_PLUGINS,
  HAMMER_GESTURE_CONFIG, HAMMER_LOADER,
  HammerGestureConfig,
  HammerModule
} from "@angular/platform-browser";
import {CommonModule, DOCUMENT} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AnimateOnViewServices} from "./shared/services/animate.services";
import {LanguageServices} from "./shared/services/language.services";

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: {
      direction: Hammer.DIRECTION_ALL,
    },
    swipe: {
      direction: Hammer.DIRECTION_HORIZONTAL,
    },
  };
}





@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CommonModule,
    HammerModule,
    AppComponent,
    SiteLayoutComponent
  ],
  exports: [

  ],
  providers: [
    AnimateOnViewServices,
    LanguageServices,
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig, deps: [] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
