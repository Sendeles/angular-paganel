import {RouterModule, Routes} from "@angular/router";
import {TeamPageComponent} from "./team-page.component";
import {NgModule} from "@angular/core";
import {AndriiAndreievPageComponent} from "../../shared/components/personal-page/andrii-andreiev-page/andrii-andreiev-page.component";

const routes: Routes = [
  {
    path: '', component: TeamPageComponent, pathMatch: 'full'
  },
  {
    path: 'andrii-andreiev', component: AndriiAndreievPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeamPageRoutingModule {

}
