import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ScreenTwoComponent } from './screen-two.component';
import { PresetsComponent } from './presets/presets.component';
import { NewComboComponent } from './newCombo/newCombo.component';
import { NewEjecutiveComponent } from './newEjecutive/newEjecutive.component';
import { NewMenuDayComponent } from './newMenuDay/newMenuDay.component';

export const screenTwoRoutes:Routes = [
  {
    path:'screentwo',
    component: ScreenTwoComponent,
    children:[
      {
        path:'',
        redirectTo: 'presets',
        pathMatch: 'full',
      },
      {
        path: 'presets',
        component: PresetsComponent
      },
      {
        path: 'nuevo-combo',
        component: NewComboComponent
      },
      {
        path: 'nuevo-ejecutivo',
        component: NewEjecutiveComponent
      },
      {
        path: 'nuevo-mday',
        component: NewMenuDayComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    ScreenTwoComponent,
    PresetsComponent,
    NewComboComponent,
    NewEjecutiveComponent,
    NewMenuDayComponent
  ],
  bootstrap: [ ]
})
export class ScreenTwoModule { }
