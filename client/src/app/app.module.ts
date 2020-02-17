import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TreeMenu } from './components/tree-menu/tree-menu';
import { Ngxi4DynamicServiceModule } from 'ngxi4-dynamic-service'
import { SharedModule } from './shared.module';

// import { IdeaCardComponent } from './components/idea-card/idea-card.component';

// import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    TreeMenu

  ],
  entryComponents: [
    TreeMenu
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    Ngxi4DynamicServiceModule.forRoot(),
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
