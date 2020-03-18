import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdeasReviewDetailPageRoutingModule } from './ideas-review-detail-routing.module';

import { IdeasReviewDetailPage } from './ideas-review-detail.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdeasReviewDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [IdeasReviewDetailPage]
})
export class IdeasReviewDetailPageModule {}
