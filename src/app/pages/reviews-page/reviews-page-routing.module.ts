import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ReviewsPageComponent} from "./reviews-page.component";
import {ReviewsComponent} from "../../shared/components/reviews/reviews.component";

const routes: Routes = [
  {
    path: '', component: ReviewsPageComponent, pathMatch: 'full'
  },
  //данный роут служит для того что бы загружалась страница с нужным айди, без данного роута меняется только маршрут в адресной строке но не загружается страница с конкретным айди
  {
    path: ':id', component: ReviewsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReviewsPageRoutingModule {

}
