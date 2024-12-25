import {RouterModule, Routes} from "@angular/router";
import {TeamPageComponent} from "./team-page.component";
import {NgModule} from "@angular/core";
import {AndriiAndreievPageComponent} from "../../shared/components/personal-page/andrii-andreiev-page/andrii-andreiev-page.component";
import {
  SliderPersonalIdComponent
} from "../../shared/components/slider-personal/slider-personal-id/slider-personal-id.component";

const routes: Routes = [
  {
    path: '', component: TeamPageComponent, pathMatch: 'full'
  },
  {
    path: 'andrii-andreiev/:id', component: SliderPersonalIdComponent //Это маршрут для отображения компонента SliderPersonalIdComponent, в который передается динамический параметр id
  },
  {
    path: ':id', component: AndriiAndreievPageComponent // обязателен для того что бы мог перейти на страницу Андрея, без него просто не пускает
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeamPageRoutingModule {

}
