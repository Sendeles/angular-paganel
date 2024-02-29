import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {SiteLayoutComponent} from "./shared/layout/site-layout/site-layout.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        path: 'aboutus',
        loadChildren: () => import('./pages/about-us-page/about-us-page.module').then(m => m.AboutUsPageModule)
      },
      {
        path: 'reviews',
        loadChildren: () => import('./pages/reviews-page/reviews-page.module').then(m => m.ReviewsPageModule)
      },
      {
        path: 'reviews/:id',
        loadChildren: () => import('./pages/reviews-page/reviews-page.module').then(m => m.ReviewsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
