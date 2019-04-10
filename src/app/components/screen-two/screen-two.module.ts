import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ScreenTwoComponent } from './screen-two.component';
import { NewComboComponent } from './newCombo/newCombo.component';
import { NewEjecutiveComponent } from './newEjecutive/newEjecutive.component';
import { NewMenuDayComponent } from './newMenuDay/newMenuDay.component';
import { SliderComponent } from './slider/slider.component';


import { ChangeClassDirective } from 'src/app/shared/changeClass.directive';
import { NewFdsComponent } from './newfds/newfds.component';
import { NewFdsComboComponent } from './newfdscombo/newfdscombo.component';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    ScreenTwoComponent,
    NewComboComponent,
    NewEjecutiveComponent,
    NewMenuDayComponent,
    ChangeClassDirective,
    SliderComponent,
    NewFdsComponent,
    NewFdsComboComponent,
    
  ],
  bootstrap: [ ScreenTwoComponent ]
})
export class ScreenTwoModule { }
