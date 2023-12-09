import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./home-page.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '', component: HomePageComponent, pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomePageRoutingModule {

}
