import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminPageComponent} from "./admin-page.component";

const routes: Routes = [
  {
    path: '', component: AdminPageComponent, pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminPageRoutingModule {

}
