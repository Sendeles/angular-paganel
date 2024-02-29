import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ReviewsPageComponent} from "./reviews-page.component";

const routes: Routes = [
  {
    path: '', component: ReviewsPageComponent, pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReviewsPageRoutingModule {

}
