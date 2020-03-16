import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdeasReviewPageRoutingModule } from './ideas-review-routing.module';

import { IdeasReviewPage } from './ideas-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdeasReviewPageRoutingModule
  ],
  declarations: [IdeasReviewPage]
})
export class IdeasReviewPageModule {}
