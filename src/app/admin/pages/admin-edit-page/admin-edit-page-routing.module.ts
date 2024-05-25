import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminEditPageComponent} from "./admin-edit-page.component";

const routes: Routes = [
  {
    path: '', component: AdminEditPageComponent, pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminEditPageRoutingModule {

}
