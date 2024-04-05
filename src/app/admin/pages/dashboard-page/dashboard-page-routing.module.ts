import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardPageComponent} from "./dashboard-page.component";

const routes: Routes = [
  {
    path: '', component: DashboardPageComponent, pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardPageRoutingModule {

}
