import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyIdeaPage } from './my-idea.page';

const routes: Routes = [
  {
    path: '',
    component: MyIdeaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyIdeaPageRoutingModule {}
