import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EditComponent } from './edit.component';


import { EditComboComponent } from './editCombo/editCombo.component';
import { EditMenuComponent } from './editMenu/editMenu.component';
import { EditEjecutiveComponent } from './editEjecutive/editEjecutive.component';
import { EditPresetComponent } from './editPreset/editPreset.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  declarations: [    
    EditComboComponent,
    EditMenuComponent,
    EditEjecutiveComponent,
    EditPresetComponent,
    EditComponent
  ],
  bootstrap: [EditComponent]
})
export class EditModule { }
