import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyIdeaPageRoutingModule } from './my-idea-routing.module';

import { MyIdeaPage } from './my-idea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyIdeaPageRoutingModule
  ],
  declarations: [MyIdeaPage]
})
export class MyIdeaPageModule {}
