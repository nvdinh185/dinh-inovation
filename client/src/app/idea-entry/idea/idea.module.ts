import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdeaPageRoutingModule } from './idea-routing.module';

import { IdeaPage } from './idea.page';
import { Ngxi4DynamicServiceModule } from 'ngxi4-dynamic-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ngxi4DynamicServiceModule,
    IdeaPageRoutingModule
  ],
  declarations: [IdeaPage]
})
export class IdeaPageModule {}
