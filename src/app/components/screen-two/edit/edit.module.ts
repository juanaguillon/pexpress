import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EditComponent } from './edit.component';


import { SanitizeHTMLPipe } from 'src/app/shared/sanitizeHTML.pipe';
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
    
    SanitizeHTMLPipe,
    EditComboComponent,
    EditMenuComponent,
    EditEjecutiveComponent,
    EditPresetComponent
  ],
  bootstrap: [EditComponent]
})
export class ScreenTwoModule { }
