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
