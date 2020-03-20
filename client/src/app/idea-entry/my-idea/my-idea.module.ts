import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyIdeaPageRoutingModule } from './my-idea-routing.module';

import { MyIdeaPage } from './my-idea.page';
import { SharedModule } from 'src/app/shared.module';
import { SortByTimePipe } from './sort-by-time.pipe';
import { Ngxi4DynamicServiceModule } from 'ngxi4-dynamic-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    Ngxi4DynamicServiceModule,
    MyIdeaPageRoutingModule
  ],
  declarations: [MyIdeaPage, SortByTimePipe]
})
export class MyIdeaPageModule {}
