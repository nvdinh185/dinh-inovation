import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdeaPageRoutingModule } from './idea-routing.module';

import { IdeaPage } from './idea.page';
import { Ngxi4DynamicServiceModule } from 'ngxi4-dynamic-service';
import { IdeaCardComponent } from 'src/app/components/idea-card/idea-card.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    Ngxi4DynamicServiceModule,
    IdeaPageRoutingModule
  ],
  declarations: [
    IdeaPage,
    IdeaCardComponent
  ]
})
export class IdeaPageModule { }
