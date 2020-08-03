import { NgModule } from '@angular/core';
import { TimeAgoPipe } from 'time-ago-pipe';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ngxi4DynamicServiceModule } from 'ngxi4-dynamic-service';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        Ngxi4DynamicServiceModule
    ],
    declarations: [TimeAgoPipe],
    exports: [
        TimeAgoPipe,
        IonicModule,
        CommonModule,
        FormsModule,
        Ngxi4DynamicServiceModule
    ]
})
export class SharedModule { }