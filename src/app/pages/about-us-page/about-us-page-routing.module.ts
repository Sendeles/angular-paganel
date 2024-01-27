import {RouterModule, Routes} from "@angular/router";
import {AboutUsPageComponent} from "./about-us-page.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '', component: AboutUsPageComponent, pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AboutUsPageRoutingModule {

}
