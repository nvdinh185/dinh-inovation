import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { Ngxi4DynamicServiceModule } from 'ngxi4-dynamic-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ngxi4DynamicServiceModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
