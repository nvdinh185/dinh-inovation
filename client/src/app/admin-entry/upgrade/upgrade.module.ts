import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpgradePageRoutingModule } from './upgrade-routing.module';

import { UpgradePage } from './upgrade.page';
import { SharedModule } from 'src/app/shared.module';
import { Ngxi4DynamicServiceModule } from 'ngxi4-dynamic-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ngxi4DynamicServiceModule,
    SharedModule,
    UpgradePageRoutingModule
  ],
  declarations: [UpgradePage]
})
export class UpgradePageModule {}
