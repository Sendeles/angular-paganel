import {NgModule} from "@angular/core";
import {ReviewsPageRoutingModule} from "./reviews-page-routing.module";
import {ReviewsComponent} from "../../shared/components/reviews/reviews.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: ReviewsComponent }, // Для пути /reviews
  { path: ':id', component: ReviewsComponent } // Для пути /reviews/:id
];

@NgModule({
  declarations: [

  ],
  imports: [
    ReviewsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})

export class ReviewsPageModule {

}
