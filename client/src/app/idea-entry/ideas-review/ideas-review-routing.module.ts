import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdeasReviewPage } from './ideas-review.page';

const routes: Routes = [
  {
    path: '',
    component: IdeasReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdeasReviewPageRoutingModule {}
