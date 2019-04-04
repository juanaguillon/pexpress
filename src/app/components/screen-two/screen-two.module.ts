import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ScreenTwoComponent } from './screen-two.component';
import { PresetsComponent } from './presets/presets.component';
import { NewComboComponent } from './newCombo/newCombo.component';
import { NewEjecutiveComponent } from './newEjecutive/newEjecutive.component';
import { NewMenuDayComponent } from './newMenuDay/newMenuDay.component';
import { SliderComponent } from './slider/slider.component';


import { ChangeClassDirective } from 'src/app/shared/changeClass.directive';



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    ScreenTwoComponent,
    PresetsComponent,
    NewComboComponent,
    NewEjecutiveComponent,
    NewMenuDayComponent,
    ChangeClassDirective,
    SliderComponent
  ],
  bootstrap: [ ScreenTwoComponent ]
})
export class ScreenTwoModule { }
