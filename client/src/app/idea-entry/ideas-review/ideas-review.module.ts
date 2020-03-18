import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdeasReviewPageRoutingModule } from './ideas-review-routing.module';

import { IdeasReviewPage } from './ideas-review.page';
import { SharedModule } from 'src/app/shared.module';
import { Ngxi4DynamicServiceModule } from 'ngxi4-dynamic-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    IdeasReviewPageRoutingModule,
    Ngxi4DynamicServiceModule
  ],
  declarations: [IdeasReviewPage]
})
export class IdeasReviewPageModule {}
