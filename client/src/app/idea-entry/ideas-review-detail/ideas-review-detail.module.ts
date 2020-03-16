import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdeasReviewDetailPageRoutingModule } from './ideas-review-detail-routing.module';

import { IdeasReviewDetailPage } from './ideas-review-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdeasReviewDetailPageRoutingModule
  ],
  declarations: [IdeasReviewDetailPage]
})
export class IdeasReviewDetailPageModule {}
