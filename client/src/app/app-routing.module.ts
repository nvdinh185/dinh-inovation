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
  },
  {
    path: 'idea-detail',
    loadChildren: () => import('./idea-entry/idea-detail/idea-detail.module').then( m => m.IdeaDetailPageModule)
  },
  {
    path: 'upgrade',
    loadChildren: () => import('./admin-entry/upgrade/upgrade.module').then( m => m.UpgradePageModule)
  },
  {
    path: 'user-activity',
    loadChildren: () => import('./main-entry/home/user-activity/user-activity.module').then( m => m.UserActivityPageModule)
  },
  {
    path: 'chat-bot',
    loadChildren: () => import('./chatbot/chat-bot/chat-bot.module').then( m => m.ChatBotPageModule)
  },
  {
    path: 'ideas-review',
    loadChildren: () => import('./idea-entry/ideas-review/ideas-review.module').then( m => m.IdeasReviewPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
