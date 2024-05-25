import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {SiteLayoutComponent} from "./shared/layout/site-layout/site-layout.component";
import {NgModule} from "@angular/core";
import {AuthGuardFunc} from "./shared/services/authorization.guard";

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
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/pages/admin-page/admin-page.module').then(m => m.AdminPageModule),
        canActivate: [AuthGuardFunc]
      },
      {
        path: 'admin/dashboard',
        loadChildren: () => import('./admin/pages/dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule),
        canActivate: [AuthGuardFunc]
      },
      {
        path: 'admin/post/:id/edit',
        loadChildren: () => import('./admin/pages/admin-edit-page/admin-edit-page.module').then(m => m.AdminEditPageModule),
        canActivate: [AuthGuardFunc]
      },
      {
        path: '404',
        loadChildren: () => import('./pages/error-page/error-page.module').then(m => m.ErrorPageModule)
      },
      {
        path: '**',
        redirectTo: '/404'
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
