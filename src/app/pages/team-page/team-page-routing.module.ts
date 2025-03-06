import {RouterModule, Routes} from "@angular/router";
import {TeamPageComponent} from "./team-page.component";
import {NgModule} from "@angular/core";
import {AndriiAndreievPageComponent} from "../../shared/components/personal-page/andrii-andreiev-page/andrii-andreiev-page.component";
import {OlgaAndreievaPageComponent} from "../../shared/components/personal-page/olga-andreieva-page/olga-andreieva-page.component";
import {SliderPersonalIdComponent} from "../../shared/components/slider-personal/slider-personal-id/slider-personal-id.component";
import {RedirectOnPersonalPageComponent} from "../../shared/components/redirect-on-personal-page/redirect-on-personal-page.component";

const routes: Routes = [
  {
    path: '', component: TeamPageComponent, pathMatch: 'full'
  },
  {
    path: 'andrii-andreiev', component: AndriiAndreievPageComponent // Перенаправление на персональную страницу
  },
  {
    path: 'andrii-andreiev/:id', component: SliderPersonalIdComponent //Это маршрут для отображения компонента SliderPersonalIdComponent, в который передается динамический параметр id
  },
  {
    path: 'olga-andreieva', component: OlgaAndreievaPageComponent // Перенаправление на персональную страницу
  },
  {
    path: 'olga-andreieva/:id', component: SliderPersonalIdComponent //Это маршрут для отображения компонента SliderPersonalIdComponent, в который передается динамический параметр id
  },
  {
    path: ':id', component: RedirectOnPersonalPageComponent // Cоздали отдельный компонент который будет определять по клику на чью страницу отправлять
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeamPageRoutingModule {

}
