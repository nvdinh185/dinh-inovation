import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./main-entry/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'idea',
    loadChildren: () => import('./idea-entry/idea/idea.module').then( m => m.IdeaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./main-entry/login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'idea-detail',
    loadChildren: () => import('./idea-entry/idea-detail/idea-detail.module').then( m => m.IdeaDetailPageModule)
  },
  {
    path: 'user-activity',
    loadChildren: () => import('./main-entry/home/user-activity/user-activity.module').then( m => m.UserActivityPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
