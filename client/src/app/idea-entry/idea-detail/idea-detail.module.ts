import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdeaDetailPageRoutingModule } from './idea-detail-routing.module';

import { IdeaDetailPage } from './idea-detail.page';
import { SharedModule } from 'src/app/shared.module';
import { Ngxi4DynamicServiceModule } from 'ngxi4-dynamic-service';
import { LinkUrlPipe } from './link.url.pipe';
import { LinkIdeasPipe } from './link-ideas.pipe';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ngxi4DynamicServiceModule,
    SharedModule,
    IdeaDetailPageRoutingModule
  ],
  declarations: [IdeaDetailPage, LinkIdeasPipe, LinkUrlPipe],
  providers: [InAppBrowser]
})
export class IdeaDetailPageModule {}
