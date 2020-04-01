import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        TimeAgoPipe
    ],
    exports: [
        TimeAgoPipe
    ]
})
export class SharedModule { }